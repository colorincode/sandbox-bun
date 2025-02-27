import sharp from "sharp";
import { readdir, mkdir, stat , copyFile, watch} from "fs/promises";
import { join, dirname, extname } from "path";
import { clearLine, cursorTo } from 'readline';

let skippedFilesCount = 0;
const processedFiles = new Set<string>();


export async function transformAssets(inputDir: string, outputDir: string, force: boolean = false) {
  skippedFilesCount = 0;
  await processAllAssets(inputDir, outputDir, force);
  // watchAssets(inputDir, outputDir);
  console.log();
}

async function processAllAssets(inputDir: string, outputDir: string, force: boolean) {
  try {
    const files = await readdir(inputDir, { withFileTypes: true });

    await Promise.all(
      files.map(async (file) => {
        const inputPath = join(inputDir, file.name);
        const outputPath = join(outputDir, file.name);

        if (file.isDirectory()) {
          await mkdir(outputPath, { recursive: true });
          await processAllAssets(inputPath, outputPath, force);
        } else {
          await processAsset(inputPath, outputPath, force);
        }
      })
    );
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log(`No assets directory found at ${inputDir}. Skipping asset transformation.`);
    } else {
      throw error;
    }
  }
}

async function processAsset(inputPath: string, outputPath: string, force: boolean) {
  if (!force && await shouldProcessFile(inputPath, outputPath) === false) {
    skippedFilesCount++;
    updateSkippedAssetsOutput();
    return;
  }

  const fileExt = extname(inputPath).toLowerCase();
  const outputDir = dirname(outputPath);
  await mkdir(outputDir, { recursive: true });

  try {
    if (/\.(png|jpg|jpeg|webp)$/i.test(fileExt)) {
      let originalPath = inputPath;
      let imgFile = Bun.file(inputPath);
      const inputBuffer = await imgFile.arrayBuffer();
      const outputBuffer = Buffer.from(inputBuffer);
      const optimized = await sharp(inputBuffer)
        .keepIccProfile()
        .toBuffer({resolveWithObject: true});
      
      if (optimized.info.size < outputBuffer.length) {
        await Bun.write(outputPath, outputBuffer);
        console.log(`Optimized: ${inputPath} -> ${outputPath}`);
      } else {
        await copyFile(inputPath, outputPath);
        console.log(`Copied (no size reduction): ${inputPath} -> ${outputPath}`);
      }
    } else {
      await copyFile(inputPath, outputPath);
      console.log(`Copied: ${inputPath} -> ${outputPath}`);
    }
    processedFiles.add(inputPath);
  
  } catch (error) {
 console.error({
      message: `Failed to process asset: ${inputPath}`,
      error: error,
    });
  }
}

function updateSkippedAssetsOutput() {
  clearLine(process.stdout, 0);
  cursorTo(process.stdout, 0);
  process.stdout.write(`Skipped assets [${skippedFilesCount}]`);
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


// function watchAssets(inputDir: string, outputDir: string) {
//   const watcher = watch(inputDir, { recursive: true });
//   console.log(`Watching ${inputDir} for changes...`);

//   (async () => {
//     for await (const event of watcher) {
//       if (event.eventType === 'change' || event.eventType === 'rename') {
//         const inputPath = join(inputDir, event.filename);
//         const outputPath = join(outputDir, event.filename);
//         await processAsset(inputPath, outputPath, true);
//       }
//     }
//   })();
// }



// export function assetPlugin() {
//   return {
//     name: "asset-loader",
//     async setup(build) {
//       build.onLoad({ filter: /\.(png|jpe?g|webp|avif)$/ }, async ({ path }) => {
//         const optimized = await sharp(path)
//           .webp({ quality: 80 })
//           .toBuffer();
        
//         return {
//           contents: optimized,
//           loader: "file"
//         };
//       });
//     }
//   };
// }