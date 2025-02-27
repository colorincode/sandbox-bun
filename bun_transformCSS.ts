
//tester code
// import "bun";
// import { $, build , FileSink, BunFile, Transpiler} from "bun";
// import { readdir, stat, mkdir, writeFile, readFile } from "fs/promises";
// import { join, relative, dirname, extname, parse, resolve } from "path";
// import path from "path"; 
// import { clearLine, cursorTo } from 'readline';
// import * as lightningcss from 'lightningcss';
// import { transform, browserslistToTargets, Features } from 'lightningcss';
// import * as sass from "sass";


// const processedFiles = new Set<string>();
// const dependencyGraph: Map<string, Set<string>> = new Map();
// const reverseDependencyGraph: Map<string, Set<string>> = new Map();
// let skippedFilesCount = 0;


// const SRC_DIR = 'src/scss';
// const OUTPUT_DIR = 'css';

// import { watch } from "bun";

// const srcDir = 'src/scss';
// const distDir = 'dist/css';

// export async function transformCSS(inputDir: string, outputDir: string) {
//   try {
//     const watcher = watch(inputDir);

//     for await (const event of watcher) {
//       if (event.path.endsWith('.scss')) {
//         console.log(`File ${event.path} changed. Rebuilding CSS...`);
//         await buildCSS(inputDir, outputDir);
//       }
//     }
//   } catch (error) {
//     console.error('Error during CSS transformation:', error);
//     throw error;
//   }
// }

// async function buildCSS(inputDir: string, outputDir: string) {
//   const result = await Bun.build({
//     entrypoints: [`${inputDir}/**/*.scss`],
//     outdir: outputDir,
//     target: 'browser',
//     minify: true,
//     loader: {
//       '.scss': 'css',
//     },
//   });

//   if (!result.success) {
//     throw new Error('CSS build failed');
//   }

//   console.log('CSS build completed successfully');
// }

// // Usage in your main build script
// export async function buildProject() {
//   console.log('Starting CSS/SCSS transformation...');
//   await transformCSS(srcDir, distDir);
//   // ... other build steps
// }



// //if no out dir when this fires, make one. 
// async function ensureOutputDir() {
//   try {
//     await mkdir(OUTPUT_DIR, { recursive: true });
//   } catch (error) {
//     if (error.code !== 'EEXIST') {
//       throw error;
//     }
//   }
// }

// //compile async may be better for this use, but if problems, consider .compile sync method. 
// export async function transformCSS(file: string): Promise<string> {
//   const result = await sass.compileAsync(file, {
//     style: 'expanded',
//     loadPaths: [SRC_DIR],
//   });
//   return result.css;
// }

// //optimize css func, create a buffer, then add lightning css mods here
// async function optimizeCSS(css: string, minify: boolean = false): Promise<string> {
//   const { code } = lightningcss.transform({
//     code: Buffer.from(css),
//     filename: "",
//     minify,
//     sourceMap: false,
//   });
//   return code.toString();
// }
// async function processFile(file: string, minify: boolean = false) {
//   const sassResult = await transformCSS(file);
//   const optimizedCSS = await optimizeCSS(sassResult, minify);
//   const outputPath = path.join(OUTPUT_DIR, path.basename(file).replace('.scss', '.css'));
//   await writeFile(outputPath, optimizedCSS);
// }

// async function buildAll(minify: boolean = false) {
//   await ensureOutputDir();
//   const files = await readdir(SRC_DIR);
//   const mainFiles = files.filter(file => file.endsWith('.scss') && !file.startsWith('_'));
//   await Promise.all(mainFiles.map(file => processFile(path.join(SRC_DIR, file), minify)));
// }

// function watchMode() {
// fs.watch(SRC_DIR, { recursive: true }, async (eventType, filename) => {
//     if (filename && filename.endsWith('.scss')) {
//       console.log(`File ${filename} changed. Rebuilding all files...`);
//       await buildAll();
//     }
//   });
// }

// export async function productionBuild() {
//   await buildAll(true);
// }

// Main execution
// if (import.meta.main) {
//   await buildAll();
//   // watchMode();
//   console.log('Watching for changes...');
// }
// export async function transformCSS(inputDir: string, outputDir: string, force: boolean = false) {
//   processedFiles.clear();
//   dependencyGraph.clear();
//   reverseDependencyGraph.clear();
//   skippedFilesCount = 0;
//   const counter = { current: 0, total: await countFiles(inputDir) };
//   process.stdout.write('Processing SCSS/CSS files: ');
//   await buildDependencyGraphs(inputDir);
//   console.log("\nDependency Graph:", dependencyGraph);
//   console.log("\nReverse Dependency Graph:", reverseDependencyGraph);
//   await processAllCSSFiles(inputDir, outputDir, counter, force);
//   console.log(`\nAll files processed. Skipped: ${skippedFilesCount}`);
// }

//frogs
// function updateProgress(current: number, total: number, skipped: number) {
//   clearLine(process.stdout, 0);
//   cursorTo(process.stdout, 0);
//   process.stdout.write(`Processing SCSS/CSS files: ${current}/${total} (Skipped: ${skipped})`);
// }

// async function countFiles(dir: string): Promise<number> {
//   let count = 0;
//   const entries = await readdir(dir, { withFileTypes: true });

//   for (const entry of entries) {
//     if (entry.isDirectory()) {
//       count += await countFiles(join(dir, entry.name));
//     } else if (/\.(scss|css)$/i.test(entry.name)) {
//       count++;
//     }
//   }

//   return count;
// }



import { readdir, stat, mkdir, writeFile, readFile } from "fs/promises";
import { join, relative, dirname, extname } from "path";
import { clearLine, cursorTo } from 'readline';
import { transform } from "lightningcss";
import * as sass from "sass";

const processedFiles = new Set<string>();
let skippedFilesCount = 0;

export async function transformCSS(inputDir: string, outputDir: string, force: boolean = false) {
  processedFiles.clear();
  skippedFilesCount = 0;
  const counter = { current: 0, total: await countFiles(inputDir) };
  process.stdout.write('Processing SCSS/CSS files: ');
  await processAllCSSFiles(inputDir, outputDir, counter, force);
  console.log(`\nAll files processed. Skipped: ${skippedFilesCount}`);
}

async function processAllCSSFiles(inputDir: string, outputDir: string, counter: { current: number, total: number }, force: boolean) {
  const files = await readdir(inputDir, { withFileTypes: true });

  for (const file of files) {
    const inputPath = join(inputDir, file.name);
    const relativePath = relative(inputDir, inputPath);
    const outputPath = join(outputDir, relativePath.replace(/\.scss$/, ".css"));

    if (processedFiles.has(inputPath)) continue;

    if (file.isDirectory()) {
      await mkdir(outputPath, { recursive: true });
      await processAllCSSFiles(inputPath, outputPath, counter, force);
    } else if (/\.(scss|css)$/i.test(file.name)) {
      await processCSSFile(inputPath, outputPath, counter, force);
    }
  }
}

async function processCSSFile(inputPath: string, outputPath: string, counter: { current: number, total: number }, force: boolean) {
  if (!force && !(await shouldProcessFile(inputPath, outputPath))) {
    skippedFilesCount++;
    updateProgress(counter.current, counter.total, skippedFilesCount);
    return;
  }

  try {
    let cssContent: string;

    if (inputPath.endsWith(".scss")) {
      const result = sass.compile(inputPath, {
        style: "compressed",
        sourceMap: false,
      });
      cssContent = result.css;
    } else {
      cssContent = await Bun.file(inputPath).text();
    }

    await mkdir(dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, cssContent);
    
    counter.current++;
    updateProgress(counter.current, counter.total, skippedFilesCount);

    processedFiles.add(inputPath);
  } catch (error) {
    console.error(`\nFailed to transform CSS/SCSS file: ${inputPath}`, error);
  }
}

async function shouldProcessFile(inputPath: string, outputPath: string): Promise<boolean> {
  try {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);

    // If the input file is newer than the output file, we should process it
    return inputStat.mtime > outputStat.mtime;
  } catch (error: any) {
    // If the output file doesn't exist (ENOENT error), we should process the input file
    if (error.code === 'ENOENT') {
      return true;
    }
    throw error;
  }
}

function updateProgress(current: number, total: number, skipped: number) {
  clearLine(process.stdout, 0);
  cursorTo(process.stdout, 0);
  process.stdout.write(`Processing SCSS/CSS files: ${current}/${total} (Skipped: ${skipped})`);
}

async function countFiles(dir: string): Promise<number> {
  let count = 0;
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += await countFiles(join(dir, entry.name));
    } else if (/\.(scss|css)$/i.test(entry.name)) {
      count++;
    }
  }

  return count;
}
