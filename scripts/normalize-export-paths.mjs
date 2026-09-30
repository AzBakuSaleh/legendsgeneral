import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next's segment-prefetch URLs use dots. On Windows, exported segment files
// can instead contain directory separators. Keep the originals and provide
// the URL-shaped aliases so static hosts can serve client navigation too.
const root = fileURLToPath(new URL("../out/", import.meta.url));
let aliases = 0;
async function flatten(directory, targetDirectory, prefix) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(source, targetDirectory, name);
    else if (entry.isFile() && entry.name.endsWith(".txt")) {
      await copyFile(source, path.join(targetDirectory, name));
      aliases++;
    }
  }
}
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const child = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) await flatten(child, directory, entry.name);
    else await visit(child);
  }
}
await visit(root);
console.log(`Static segment paths checked (${aliases} aliases).`);
