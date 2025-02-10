// build_prod.ts
import { build } from "bun";
import { buildProject } from "./bun_build";

// import autoprefixer from "autoprefixer";

// Bun.plugin({
//   name: "prod-optimizer",
//   setup(build) {
//     build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
//       const processed = await postcss([autoprefixer]).process(
//         await Bun.file(path).text()
//       );
      
//       return {
//         contents: processed.css,
//         loader: "css"
//       };
//     });
//   }
// });


  