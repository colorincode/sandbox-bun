import { build } from "bun";
import { resolve , join} from "path";
import { readdir, stat, unlink, rmdir, mkdir, writeFile } from "fs/promises";


const fileCache = new Map<string, number>();

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
  const allFiles = await getAllFiles(srcDir);
  const jsFiles = allFiles.filter(file => /\.(ts|js)$/.test(file));

  if (jsFiles.length === 0) {
    console.log(`No JavaScript or TypeScript files found in '${srcDir}'`);
    return;
  }

  const changedFiles = await Promise.all(jsFiles.map(async file => {
    if (await hasFileChanged(file)) {
      return file;
    }
    return null;
  }));

  const filesToTransform = changedFiles.filter(Boolean) as string[];

  if (filesToTransform.length === 0) {
    console.log("No files have changed. Skipping transformation.");
    return;
  }

  console.log("Transforming JS files:", filesToTransform);

  const result = await build({
    entrypoints: filesToTransform,
    outdir: outputDir,
    target: "browser",
    format: "esm",
    sourcemap: "inline",
  });

  if (!result.success) {
    throw new Error("JavaScript transformation failed.");
  }
}
