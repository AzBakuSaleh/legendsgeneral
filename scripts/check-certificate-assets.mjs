import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";

const manifestPath = "scripts/approved-public-assets.json";
const publicAssetPath = /^(?:[a-z0-9_-]+\/)*[a-z0-9_-]+\.(?:jpe?g|png|svg|webp)$/;
const documentExtension = /\.(?:pdf|docx?|xlsx?|pptx?|od[tsp]|tiff?|zip|rar|7z|tar|gz|tgz|bz2|xz|zst)$/i;
const pdfSignature = Buffer.from("255044462d", "hex");
const archiveOrDocumentSignatures = [
  "504b0304", "504b0506", "504b0708", // ZIP and OOXML
  "d0cf11e0a1b11ae1", // OLE compound Office documents
  "49492a00", "4d4d002a", "49492b00", "4d4d002b", // TIFF and BigTIFF
  "526172211a07", "377abcaf271c", "1f8b08", "425a68", "fd377a585a00", "28b52ffd",
].map((hex) => Buffer.from(hex, "hex"));
const tarSignature = Buffer.from("ustar");
const utf8 = new TextDecoder("utf-8", { fatal: true });
const inlineBinary = /data:(?:application|image)\/[\w.+-]+(?:;[\w=.+-]+)*;base64\s*,/i;

function reject(path, reason) {
  throw new Error(`${path}: ${reason}`);
}

function regularFile(path, label = path) {
  const info = lstatSync(path, { throwIfNoEntry: false });
  if (!info?.isFile()) reject(label, `expected a regular file at ${path}`);
  return readFileSync(path);
}

function* filesIn(directory) {
  if (!lstatSync(directory, { throwIfNoEntry: false })?.isDirectory()) {
    reject(directory, "expected a directory");
  }
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) yield* filesIn(path);
    else if (entry.isFile()) yield path;
    else reject(path, "expected a regular file");
  }
}

function checkSignature(path, data) {
  if (
    data.subarray(0, 1024).includes(pdfSignature)
    || archiveOrDocumentSignatures.some((signature) => data.subarray(0, signature.length).equals(signature))
    || data.subarray(257, 262).equals(tarSignature)
  ) {
    reject(path, "forbidden document or archive signature");
  }
}

function checkText(path, data) {
  let text;
  try {
    text = utf8.decode(data);
  } catch {
    reject(path, "unapproved binary or invalid UTF-8");
  }
  for (const character of text) {
    const code = character.charCodeAt(0);
    if (code < 32 && character !== "\t" && character !== "\n" && character !== "\r") {
      reject(path, "unapproved binary or invalid UTF-8");
    }
  }
  if (inlineBinary.test(text)) reject(path, "embedded binary data URL");
  return text;
}

function loadApprovedAssets() {
  const manifest = JSON.parse(regularFile(manifestPath).toString("utf8"));
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    reject(manifestPath, "expected a path-to-SHA-256 object");
  }
  const entries = Object.entries(manifest);
  if (entries.length === 0) reject(manifestPath, "expected at least one approved public asset");
  for (const [path, digest] of entries) {
    if (!publicAssetPath.test(path) || typeof digest !== "string" || !/^[a-f0-9]{64}$/.test(digest)) {
      reject(manifestPath, `invalid path or SHA-256 for ${path}`);
    }
  }
  return new Map(entries);
}

function checkApprovedAsset(path, data, digest) {
  checkSignature(path, data);
  if (createHash("sha256").update(data).digest("hex") !== digest) {
    reject(path, "SHA-256 differs from the approved public asset");
  }
}

function readIndexBlobs(entries) {
  const hashes = [...new Set(entries.map(({ hash }) => hash))];
  const batch = execFileSync("git", ["cat-file", "--batch"], {
    input: hashes.join("\n") + "\n",
    maxBuffer: 64 * 1024 * 1024,
  });
  const blobs = new Map();
  let offset = 0;
  for (const hash of hashes) {
    const headerEnd = batch.indexOf(10, offset);
    if (headerEnd === -1) reject("git", "incomplete Git index blob response");
    const [responseHash, type, size] = batch.toString("ascii", offset, headerEnd).split(" ");
    const end = headerEnd + 1 + Number(size);
    if (responseHash !== hash || type !== "blob" || !/^\d+$/.test(size) || batch[end] !== 10) {
      reject("git", "invalid Git index blob response");
    }
    blobs.set(hash, batch.subarray(headerEnd + 1, end));
    offset = end + 1;
  }
  if (offset !== batch.length) reject("git", "unexpected Git index blob response");
  return blobs;
}

function checkTrackedSource(path, data, label = path) {
  checkSignature(label, data);
  if (documentExtension.test(path)) reject(label, "forbidden document or archive extension");
  checkText(label, data);
}

function checkRepository(approved) {
  const tracked = execFileSync("git", ["ls-files", "--stage", "--full-name", "-z"], { encoding: "utf8" });
  if (!tracked) reject("git", "expected tracked repository files");
  const entries = tracked.split("\0").filter(Boolean).map((entry) => {
    const tab = entry.indexOf("\t");
    const path = entry.slice(tab + 1);
    const mode = /^100(?:644|755) ([a-f0-9]+) 0$/.exec(entry.slice(0, tab));
    if (!mode) reject(path, "expected a regular tracked file");
    return { path, hash: mode[1] };
  });
  const blobs = readIndexBlobs(entries);
  const publicFiles = new Set();
  for (const { path, hash } of entries) {
    const indexed = blobs.get(hash);
    if (path.startsWith("public/")) {
      const digest = approved.get(path.slice("public/".length));
      if (!digest) reject(path, "not in the approved public assets");
      checkApprovedAsset(`${path} (Git index)`, indexed, digest);
      publicFiles.add(path);
    } else {
      const data = regularFile(path);
      checkTrackedSource(path, data);
      if (!data.equals(indexed)) checkTrackedSource(path, indexed, `${path} (Git index)`);
    }
  }

  const checked = new Set();
  for (const path of filesIn("public")) {
    const digest = approved.get(path.slice("public/".length));
    if (!digest) reject(path, "not in the approved public assets");
    if (!publicFiles.has(path)) reject(path, "approved asset must be tracked");
    checkApprovedAsset(path, regularFile(path), digest);
    checked.add(path);
  }
  for (const path of approved.keys()) {
    if (!checked.has(`public/${path}`)) reject(`public/${path}`, "approved asset is missing");
  }
  for (const path of publicFiles) {
    if (!checked.has(path)) reject(path, "tracked public file is missing");
  }
}

// Next's static export contains route HTML, RSC payloads and static JS/CSS.
// Match the export paths back to actual build output, including the flattened
// segment aliases produced by normalize-export-paths.mjs.
function buildCounterpart(path) {
  const serverApp = ".next/server/app/";
  if (path === "404.html" || path === "404/index.html") return `${serverApp}_not-found.html`;
  const page = /^(?<route>(?:[a-z0-9_-]+\/)*)index\.(?<extension>html|txt)$/.exec(path);
  if (page) {
    const { route, extension } = page.groups;
    return `${serverApp}${route.slice(0, -1) || "index"}.${extension === "txt" ? "rsc" : "html"}`;
  }
  const payload = /^(?<route>(?:[a-z0-9_-]+\/)*)__next\.(?<segment>[a-z0-9_$-]+(?:[./][a-z0-9_$-]+)*)\.txt$/i.exec(path);
  if (payload) {
    const { route, segment } = payload.groups;
    return `${serverApp}${route.slice(0, -1) || "index"}.segments/${segment.replace(/[./]/g, "/")}.segment.rsc`;
  }
  if (/^_next\/static\/chunks\/[a-z0-9_-]+\.(?:js|css)$/i.test(path)) {
    return `.${path.slice(1)}`;
  }
  const manifest = /^_next\/static\/([a-z0-9_-]+)\/_(?:buildManifest|clientMiddlewareManifest|ssgManifest)\.js$/i.exec(path);
  if (manifest && manifest[1] === regularFile(".next/BUILD_ID").toString("utf8").trim()) {
    return `.${path.slice(1)}`;
  }
  return undefined;
}

function checkExport(approved) {
  if (!/^<!doctype html>/i.test(regularFile("out/index.html").toString("utf8"))) {
    reject("out/index.html", "expected a Next HTML entry point");
  }
  const exported = new Set();
  for (const path of filesIn("out")) {
    const name = path.slice("out/".length);
    const data = regularFile(path);
    const digest = approved.get(name);
    if (digest) {
      checkApprovedAsset(path, data, digest);
      exported.add(name);
      continue;
    }
    if (name === ".nojekyll") {
      if (data.length) reject(path, "Pages marker must be empty");
      continue;
    }
    checkSignature(path, data);
    const counterpart = buildCounterpart(name);
    if (!counterpart) reject(path, "unexpected export file");
    if (!data.equals(regularFile(counterpart, `${path} build counterpart`))) {
      reject(path, "differs from its Next build counterpart");
    }
    checkText(path, data);
  }
  for (const path of approved.keys()) {
    if (!exported.has(path)) reject(`out/${path}`, "approved asset is missing");
  }
}

try {
  const mode = process.argv[2];
  if (process.argv.length !== 3 || !["repo", "export"].includes(mode)) {
    throw new Error("usage: node scripts/check-certificate-assets.mjs <repo|export>");
  }
  const approved = loadApprovedAssets();
  if (mode === "repo") checkRepository(approved);
  else checkExport(approved);
  console.log(`Certificate asset guard passed (${mode}).`);
} catch (error) {
  console.error(`Certificate asset guard failed: ${error.message}`);
  process.exitCode = 1;
}
