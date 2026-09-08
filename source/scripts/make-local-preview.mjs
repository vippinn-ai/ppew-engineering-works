/**
 * Produces ./local-preview — a copy of the static export with every asset path
 * rewritten to be relative, so index.html can be opened straight from disk in a
 * browser with no server running.
 *
 *   npm run preview:local
 *
 * The normal `npm run build` output in ./out keeps absolute paths and is what
 * you deploy. Do not upload local-preview.
 *
 * Three separate things need handling, and missing any one produces a page that
 * looks broken in a different way:
 *
 *   1. Framework assets (_next/...). Handled by Next's own `assetPrefix`, set
 *      to "." for this build via the LOCAL_PREVIEW env var. This also fixes
 *      webpack's runtime publicPath so lazily-loaded chunks resolve.
 *
 *   2. Our own <img src="/products/..."> paths. `assetPrefix` does NOT touch
 *      these. They must be rewritten in the HTML *and* in the JS bundles — the
 *      prerendered HTML is only what shows before React hydrates; once it does,
 *      React re-renders from the paths compiled into the bundle.
 *
 *   3. url() inside CSS. These resolve against the stylesheet's own folder
 *      (_next/static/css/), not the site root, so the self-hosted fonts need
 *      ../media/. Miss this and the page silently falls back to system fonts.
 */
import { cp, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const SRC = "out";
const DEST = "local-preview";

console.log("Building with relative asset paths...");
const build = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  env: { ...process.env, LOCAL_PREVIEW: "1" },
  shell: process.platform === "win32",
});
if (build.status !== 0) process.exit(build.status ?? 1);

await rm(DEST, { recursive: true, force: true });
await cp(SRC, DEST, { recursive: true });

// Every top-level folder in public/ is served from the site root, and
// assetPrefix does not touch those paths. Deriving the list from the folder
// rather than hard-coding it means adding a new asset directory cannot
// silently ship a preview with broken images — which is exactly what happened
// when public/facility was added.
const publicDirs = (await readdir("public", { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const relativise = (text) =>
  publicDirs.reduce((acc, dir) => acc.replaceAll(`"/${dir}/`, `"./${dir}/`), text);

for (const file of ["index.html", "404.html"]) {
  const p = path.join(DEST, file);
  try {
    await writeFile(p, relativise(await readFile(p, "utf8")));
  } catch {
    /* 404.html may not be present */
  }
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

let jsPatched = 0;
for (const f of await walk(path.join(DEST, "_next"))) {
  if (!f.endsWith(".js")) continue;
  const src = await readFile(f, "utf8");
  const next = relativise(src);
  if (next !== src) {
    await writeFile(f, next);
    jsPatched++;
  }
}

let cssPatched = 0;
const cssDir = path.join(DEST, "_next/static/css");
for (const f of await readdir(cssDir)) {
  if (!f.endsWith(".css")) continue;
  const p = path.join(cssDir, f);
  const src = await readFile(p, "utf8");
  const next = src
    .replaceAll("url(/_next/static/media/", "url(../media/")
    .replaceAll("url(_next/static/media/", "url(../media/");
  if (next !== src) {
    await writeFile(p, next);
    cssPatched++;
  }
}

console.log(`Patched ${jsPatched} JS bundle(s) and ${cssPatched} stylesheet(s).`);
console.log(`Done. Open ${path.resolve(DEST, "index.html")} in your browser.`);
