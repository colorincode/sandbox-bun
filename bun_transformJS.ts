import { $, build , FileSink, BunFile, Transpiler} from "bun";
import { readdir, stat, unlink, rmdir, mkdir, writeFile } from "fs/promises";
import * as fs from 'fs';
import path, { join, relative, dirname, extname } from "path";
// Bun.plugin(globResolverPlugin());
const fileCache = new Map<string, number>();


const srcDir = "./src";
const outDir = "./dist";

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(fullPath) : [fullPath];
    })
  );
  return files.flat();
}

export async function transformJS(srcDir: string, outDir: string) {
  const allFiles = await getAllFiles(srcDir);
  const tsFiles = allFiles.filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'));

  console.log("Transforming TypeScript files:", tsFiles.length);

  const result = await build({
    entrypoints: ['tsFiles'],
    outdir: './dist',
    target: "bun",
    format: "esm",
    sourcemap: "none",
    minify: true,
  });

  if (!result.success) {
    console.error("Build errors:", result.logs);
    throw new Error("TypeScript transformation failed.");
  }

  console.log("TypeScript files successfully transformed to JavaScript.");
}

// Run the transformation


