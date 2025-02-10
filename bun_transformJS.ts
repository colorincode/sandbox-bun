import { build } from "bun";
import { readdir, stat, unlink, rmdir, mkdir, writeFile } from "fs/promises";
import path, { join, relative, dirname, extname } from "path";
import { globResolverPlugin } from './globresolver';
Bun.plugin(globResolverPlugin());
const fileCache = new Map<string, number>();
const outDir = "./dist";
async function getAllFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir, { withFileTypes: true });
  const allFilesPromises = files.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return await getAllFiles(fullPath);
    } else {
      return [fullPath];
    }
  });

  const nestedFiles = await Promise.all(allFilesPromises);
  return nestedFiles.flat();
}

async function hasFileChanged(file: string): Promise<boolean> {
  const stats = await stat(file);
  const lastModified = stats.mtimeMs;
  const cachedTime = fileCache.get(file);
  
  if (!cachedTime || cachedTime < lastModified) {
    fileCache.set(file, lastModified);
    return true;
  }
  return false;
}

export async function transformJS(srcDir: string, outputDir: string) {
     // Handle TS/JS files
  const allFiles = await getAllFiles(srcDir);
  const jsFiles = allFiles.filter(file => /\.(ts|js)$/.test(file));

   const tsJsFiles = allFiles
   .filter(file => file.endsWith(".ts") && !file.endsWith(".d.ts"))
   .map(file => path.relative(srcDir, file));
    console.log("Transforming JS files:", tsJsFiles.length);

  const result = await Bun.build({
    entrypoints: tsJsFiles,
    outdir: path.join(outDir, 'js'),
    target: "bun",
    format: "esm",
    sourcemap: "none",
    minify: { whitespace: true, identifiers: true, syntax: true },
    plugins: [globResolverPlugin()],
  });

  if (!result.success) {
    throw new Error("JavaScript transformation failed.");
  }
}

