import { build } from "bun";
// import { transform } from "bun:css";
import { readdir, stat, unlink, rmdir, mkdir, writeFile,readFile } from "fs/promises";
import { join, relative, dirname, extname } from "path";
import { transform } from "lightningcss";
import * as sass from "sass";
// Bun.plugin({
//   name: "css-processor",
//   setup(build) {
//     build.onLoad({ filter: /\.(css|scss)$/ }, async (args) => {
//       const processed = await Bun.transform.css(args.path, {
//         minify: true,
//         sourcemap: "inline"
//       });
//       return { contents: processed.code };
//     });
//   }
// });


// Bun.plugin({
//   name: "sass-loader",
//   setup(build) {
//     build.onLoad({ filter: /\.scss$/ }, async ({ path }) => {
//       const compiled = await Bun.resolve(path, build.config.root);
//       return { contents: compiled };
//     });
//   }
// });


// Bun.plugin({
//   name: "css-modules",
//   setup(build) {
//     build.onLoad({ filter: /\.module\.css$/ }, async ({ path }) => {
//       const { code, exports } = await transform({
//         filename: path,
//         code: Buffer.from(await Bun.file(path).text()),
//         cssModules: true
//       });
//       return { contents: `export default ${JSON.stringify(exports)}` };  
//     });
//   }
// });

const processedFiles = new Set<string>();

export async function transformCSS(inputDir: string, outputDir: string) {
  const files = await readdir(inputDir, { withFileTypes: true });

  for (const file of files) {
    const inputPath = join(inputDir, file.name);
    const relativePath = relative(inputDir, inputPath);
    const outputPath = join(outputDir, relativePath.replace(/\.scss$/, ".css"));

    if (processedFiles.has(inputPath)) continue;

    if (file.isDirectory()) {
      await mkdir(outputPath, { recursive: true });
      await transformCSS(inputPath, outputPath);
    } else if (/\.(scss|css)$/i.test(file.name)) {
      try {
        let cssContent: string;

        if (file.name.endsWith(".scss")) {
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
        console.log("Processed:", files.length);

        processedFiles.add(inputPath);
      } catch (error) {
        console.error(`Failed to transform CSS/SCSS file: ${inputPath}`, error);
      }
    }
  }
}
