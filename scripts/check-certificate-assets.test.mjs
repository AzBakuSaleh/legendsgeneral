import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const guard = fileURLToPath(new URL("./check-certificate-assets.mjs", import.meta.url));
const asset = "<svg xmlns=\"http://www.w3.org/2000/svg\"/>";
const page = "<!DOCTYPE html><html><body>Catalog</body></html>";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "legends-asset-guard-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));

  function write(name, content) {
    const path = join(root, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }

  function git(...args) {
    execFileSync("git", args, { cwd: root, stdio: "pipe" });
  }

  function run(mode) {
    return spawnSync(process.execPath, [guard, mode], { cwd: root, encoding: "utf8" });
  }

  function pass(mode) {
    const result = run(mode);
    assert.equal(result.status, 0, result.stderr);
  }

  function fail(mode, message) {
    const result = run(mode);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, message);
  }

  git("init", "-q");
  write("scripts/approved-public-assets.json", JSON.stringify({
    "logo.svg": createHash("sha256").update(asset).digest("hex"),
  }));
  write("public/logo.svg", asset);
  write("out/logo.svg", asset);
  write("out/index.html", page);
  write(".next/server/app/index.html", page);
  write("out/.nojekyll", "");
  git("add", "public", "scripts");
  return { root, write, git, pass, fail };
}

test("accepts the approved public tree and matching static export", (t) => {
  const { write, pass } = fixture(t);
  write("out/elaqe/index.html", page);
  write(".next/server/app/elaqe.html", page);
  write("out/elaqe/__next.elaqe.__PAGE__.txt", "0:[]");
  write("out/elaqe/__next.elaqe/__PAGE__.txt", "0:[]");
  write(".next/server/app/elaqe.segments/elaqe/__PAGE__.segment.rsc", "0:[]");
  write("out/_next/static/chunks/0test-chunk.js", "console.log('ready');");
  write(".next/static/chunks/0test-chunk.js", "console.log('ready');");
  pass("repo");
  pass("export");
});

const signatures = [
  ["PDF after a preamble", "202020255044462d312e37"],
  ["ZIP and modern Office", "504b0304"],
  ["compound Office", "d0cf11e0a1b11ae1"],
  ["TIFF", "4d4d002a"],
  ["BigTIFF", "49492b00"],
  ["RAR", "526172211a070100"],
  ["7z", "377abcaf271c"],
];

for (const [format, hex] of signatures) {
  test(`rejects a tracked ${format} renamed as text outside public`, (t) => {
    const { write, git, fail } = fixture(t);
    write("notes/ordinary.txt", Buffer.from(hex, "hex"));
    git("add", "notes");
    fail("repo", /notes\/ordinary\.txt.*forbidden document or archive signature/i);
  });
}

test("rejects a PDF staged under a benign filename after its worktree file is cleaned", (t) => {
  const { write, git, fail } = fixture(t);
  write("notes/ordinary.txt", Buffer.from("255044462d312e37", "hex"));
  git("add", "notes");
  write("notes/ordinary.txt", "ordinary text");
  fail("repo", /notes\/ordinary\.txt.*Git index.*forbidden document or archive signature/i);
});

test("rejects a staged public replacement even after restoring the worktree copy", (t) => {
  const { write, git, fail } = fixture(t);
  write("public/logo.svg", "<svg/>");
  git("add", "public/logo.svg");
  write("public/logo.svg", asset);
  fail("repo", /public\/logo\.svg.*Git index.*SHA-256/i);
});

test("rejects an unreviewed public image even when untracked", (t) => {
  const { write, fail } = fixture(t);
  write("public/photo.jpg", Buffer.from("ffd8ffe0", "hex"));
  fail("repo", /public\/photo\.jpg.*not in the approved public assets/i);
});

test("rejects a replacement at an approved public path", (t) => {
  const { write, fail } = fixture(t);
  write("public/logo.svg", "<svg/>");
  fail("repo", /public\/logo\.svg.*SHA-256/i);
});

test("rejects an approved file missing from the working public tree", (t) => {
  const { root, fail } = fixture(t);
  rmSync(join(root, "public/logo.svg"));
  fail("repo", /public\/logo\.svg.*approved asset is missing/i);
});

test("rejects an embedded binary data URL in tracked source text", (t) => {
  const { write, git, fail } = fixture(t);
  const payload = "data:" + "application/pdf;base64,JVBERi0x";
  write("notes/ordinary.txt", payload);
  git("add", "notes");
  fail("repo", /notes\/ordinary\.txt.*embedded binary data URL/i);
});

test("rejects an unapproved binary image outside public", (t) => {
  const { write, git, fail } = fixture(t);
  write("notes/ordinary.txt", Buffer.from("ffd8ffe0", "hex"));
  git("add", "notes");
  fail("repo", /notes\/ordinary\.txt.*binary or invalid UTF-8/i);
});

test("rejects a missing export index", (t) => {
  const { root, fail } = fixture(t);
  rmSync(join(root, "out/index.html"));
  fail("export", /out\/index\.html/i);
});

test("rejects a missing approved asset in the export", (t) => {
  const { root, fail } = fixture(t);
  rmSync(join(root, "out/logo.svg"));
  fail("export", /out\/logo\.svg/i);
});

test("rejects a generic filename added to the export", (t) => {
  const { write, fail } = fixture(t);
  write("out/notes.txt", "text");
  fail("export", /out\/notes\.txt.*unexpected export file/i);
});

test("rejects an export asset replaced under an approved path", (t) => {
  const { write, fail } = fixture(t);
  write("out/logo.svg", "<svg/>");
  fail("export", /out\/logo\.svg.*SHA-256/i);
});

test("rejects a generated-looking asset without matching Next output", (t) => {
  const { write, fail } = fixture(t);
  write("out/_next/static/chunks/fake-chunk.js", "console.log('rogue');");
  fail("export", /out\/_next\/static\/chunks\/fake-chunk\.js.*build counterpart/i);
});

test("rejects a changed generated export even if the filename is valid", (t) => {
  const { write, fail } = fixture(t);
  write("out/index.html", "<!DOCTYPE html><html>changed</html>");
  fail("export", /out\/index\.html.*differs from its Next build counterpart/i);
});

test("rejects a renamed PDF in generated-looking output even if the counterpart matches", (t) => {
  const { write, fail } = fixture(t);
  const pdf = Buffer.from("255044462d312e37", "hex");
  write("out/_next/static/chunks/fake-chunk.js", pdf);
  write(".next/static/chunks/fake-chunk.js", pdf);
  fail("export", /out\/_next\/static\/chunks\/fake-chunk\.js.*forbidden document or archive signature/i);
});

test("rejects a nonempty Pages marker", (t) => {
  const { write, fail } = fixture(t);
  write("out/.nojekyll", "unexpected text");
  fail("export", /out\/\.nojekyll.*must be empty/i);
});

test("rejects exported symlinks and Windows junctions", (t) => {
  const { root, fail } = fixture(t);
  if (process.platform === "win32") {
    symlinkSync(join(root, "public"), join(root, "out/alias"), "junction");
  } else {
    symlinkSync("logo.svg", join(root, "out/alias"));
  }
  fail("export", /out\/alias.*regular file/i);
});
