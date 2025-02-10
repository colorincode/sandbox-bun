// this should echo and run the build script, but can alter this script for dev purposes only. 
import "bun";
import { $, build , FileSink, BunFile, Transpiler} from "bun";
import { readdir, stat, unlink, rmdir, mkdir, writeFile } from "fs/promises";
import { join, relative, dirname, extname } from "path";
import { transform, browserslistToTargets, Features } from 'lightningcss';
import { transformAssets } from "./bun_transformassets";
import { transformJS } from "./bun_transformJS";
import { transformCSS } from "./bun_transformCSS";
import { buildProject } from "./bun_build";
import chokidar from "chokidar";
try {
    await buildProject();
  } catch (error) {
    console.error("Error during build:", error);
  }
  
  const watcher = chokidar.watch("./src/scss", { persistent: true });

  watcher.on("change", async (path) => {
    console.log(`File changed: ${path}`);
    await transformCSS("./src/scss", "./dist/css");
  });