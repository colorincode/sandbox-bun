// build.ts - this is meant to be a shared core module, so prod.ts and dev.ts can both utilize it. 

import "bun";
import { $, build , FileSink, BunFile, Transpiler} from "bun";
import { readdir, stat, unlink, rmdir, mkdir, writeFile } from "fs/promises";
import { join, relative, dirname, extname } from "path";
import { transform, browserslistToTargets, Features } from 'lightningcss';
import { transformAssets } from "./bun_transformassets";
import { transformJS } from "./bun_transformJS";
import { transformCSS } from "./bun_transformCSS";

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

//intent is parallelism and not passing all async ops simulataneously, 
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

async function copyHTMLFiles(srcDir: string, distDir: string) {
  const htmlFiles = (await getAllFiles(srcDir)).filter(file => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const relativePath = relative(srcDir, file);
    const destPath = join(distDir, relativePath);
    await mkdir(dirname(destPath), { recursive: true });
    await Bun.write(destPath, Bun.file(file));
  }
  console.log("HTML files copied successfully!");
}


export async function buildProject() {
  const srcDir = "./src";
  const distDir = "./dist";
  const assetsDir = "./assets"; // New location for assets
  const cache = new Map<string, number>();

  try {
    await $`mkdir -p ${distDir}`;

    const allSrcFiles = await getAllFiles(srcDir);
    const entrypoints = allSrcFiles.filter(file =>
      file.startsWith(join(srcDir, "ts")) && (file.endsWith(".ts") || file.endsWith(".js"))
    );
    
    // const entrypoints = [`${srcDir}/ts/**/*.ts`];
    console.log("Entrypoints:", entrypoints);

    await build({
      entrypoints,
      outdir: distDir,
      target: "browser",
      format: "esm",
      sourcemap: "none",
      minify: { whitespace: true, identifiers: true, syntax: true },
      root: srcDir,
    });
    for (const file of allSrcFiles) {
      const relativePath = relative(srcDir, file);
      const destPath = join(distDir, relativePath);
      
    await mkdir(dirname(destPath), { recursive: true });
    console.log("Starting HTML file copy...");
    await copyHTMLFiles(srcDir, distDir);
    console.log("Starting asset transformation...");
    await transformAssets(`./assets`, `${distDir}/assets`);

    console.log("Starting JavaScript transformation...");
    await transformJS(`${srcDir}/ts`, `${distDir}/js`);

    console.log("Starting CSS/SCSS transformation...");
    await transformCSS(`${srcDir}/scss`, `${distDir}/css`);

    console.log("Build completed successfully!");
  } 
}
  catch (error) {
    console.error("Build failed:", error);
  }
}

// async function catchErrors() {
  //add
  // const result = await Bun.build({
  //   entrypoints: ["./src/ts/app.ts"],
  //   outdir: "./dist",
  // });
  
//   if (!result.success) {
//     throw new AggregateError(result.logs, "Build failed");
//   }
// }

  async function cleanupDist(srcDir: string, outDir: string) {
    const allSrcFiles = await getAllFiles(srcDir);
    const allDistFiles = await getAllFiles(outDir);
  
    for (const distFile of allDistFiles) {
      const relativePath = relative(outDir, distFile);
      const srcPath = join(srcDir, relativePath);
      
      if (!allSrcFiles.includes(srcPath) && 
          !allSrcFiles.includes(srcPath.replace(/\.js$/, '.ts'))) {
        await unlink(distFile);
      }
    }
  
    // Remove empty directories
    await removeEmptyDirs(outDir);
  }
  
  async function removeEmptyDirs(dir: string) {
    const files = await readdir(dir);
    
    for (const file of files) {
      const fullPath = join(dir, file);
      if ((await stat(fullPath)).isDirectory()) {
        await removeEmptyDirs(fullPath);
      }
    }
  
    const updatedFiles = await readdir(dir);
    if (updatedFiles.length === 0) {
      await rmdir(dir);
    }
  }
// Cache validation helper
async function needsRebuild(src: BunFile, dest: BunFile, cache: Map<string, number>) {
  const srcTime = (await src.exists()) ? (await src.lastModified)?.getTime() : 0;
  const destTime = cache.get(dest.name!) || 0;
  return srcTime > destTime;
}


// Edit with severest of cautions
// u could literally break this whole thing 
//seriously dont fuck this part up
//build the project - remember, global util, TAKE HEED
// export async function buildProject() {
//   const srcDir = "./dist";
//   const outDir = "./prod";
//   const cache = new Map<string, number>();

//   try {
//     // bun says this is optimized directory creation, i have doubts
//     await $`mkdir -p ${outDir}`;

//     const allSrcFiles = await getAllFiles(srcDir);
//     const entrypoints = allSrcFiles.filter(file => 
//       file.endsWith(".ts") || file.endsWith(".js")
//     );

//     // incrementally build instead of forcing entire files
//     await build({
//       entrypoints,
//       outdir: outDir,
//       target: "browser",
//       format: "esm",
//       sourcemap: "none",
//       minify: { whitespace: true, identifiers: true, syntax: true },
//       root: srcDir,
//       // plugins: [lightningcss()], //apparently this is natively supported now?
//       cache: true // let's see if this works despite TS grievances idk
//     });

//     // Process files with buffered writes
//     await Promise.all(allSrcFiles.map(async (file) => {
//       const relativePath = relative(srcDir, file);
//       const destPath = join(outDir, relativePath);
      
//       // Create directory structure using optimized Bun APIs
//       await $`mkdir -p ${dirname(destPath)}`;

//       if (file.endsWith(".scss") || file.endsWith(".css")) {
//         // filesink to increment - this im unsure about
//         const srcFile = Bun.file(file);
//         const destFile = Bun.file(destPath);
        
//         // Check cache before processing
//         if (await needsRebuild(srcFile, destFile, cache)) {
//           const writer = destFile.writer({ highWaterMark: 1024 * 1024 });
//           const css = await srcFile.text();
//           const { code } = transform({
//             filename: file,
//             code: Buffer.from(css),
//             minify: true,
//             cssModules: { pattern: 'cic--[local]' },
//           });
//              // Process with PostCSS for optimization and tree shaking
         
    
//           // const { code} = 
//           await writer.write(css);
//           writer.write(code);
//           await writer.flush();
//           writer.end();
//           cache.set(destPath, Date.now());
//         }
//       } else if (!file.endsWith(".ts") && !file.endsWith(".js")) {
//         // 
//         await Bun.write(destPath, Bun.file(file));
//       }
//     }));

//     await cleanupDist(srcDir, outDir);
//     console.log("buns fresh off the oven. build completed successfully");
//   } catch (error) {
//     catchErrors();
//   }
// }
// const BuildConfig: any({
//   mode: "development",
//   incremental: true,
//   watch: false,
// });
//hmmm idk about this tbh
// await buildProject({
//   mode: "production",
//   minify: true,
//   sourcemap: false,
//   biome: { lint: true }
// });