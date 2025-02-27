import { serve } from "bun";
import { watch } from "fs";
import { join } from "path";
import { buildProject } from "./bun_build";
import type { ServerWebSocket } from "bun";

const clients = new Set<ServerWebSocket<unknown>>();
let isBuilding = false;

type DisposableTimer = Timer & { [Symbol.dispose](): void };
let buildTimeout: DisposableTimer | null = null;

async function findAvailablePort(startPort: number = 1234): Promise<number> {
  for (let port = startPort; port < 65536; port++) {
    try {
      const server = Bun.serve({
        port,
        fetch() {
          return new Response("Port check");
        },
      });
      
      server.stop();
      return port;
    } catch (error) {
      if (error.code !== 'EADDRINUSE') {
        throw error; // Re-throw if it's not a "port in use" error
      }
      // If the port is in use, the loop will continue to the next port
    }
  }
  throw new Error("No available ports found");
}


async function startServer() {
  const port = await findAvailablePort();

  const server = Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);
      let filePath = join("./dist", url.pathname);
      //serve the index as the default from dist 
      if (url.pathname === '/' || url.pathname === '/index.html') {
        filePath = join("./dist", 'index.html');
      }

      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (exists) {
        return new Response(file);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },
    websocket: {
      message(ws, message) {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
      },
      open(ws) {
        clients.add(ws);
      },
      close(ws) {
        clients.delete(ws);
      },
    },
  });

  console.log(`Server running at http://localhost:${port}`);
  return server;
}
// async function debouncedBuild() {
//   if (buildTimeout) {
//     clearTimeout(buildTimeout);
//   }
//   buildTimeout = setTimeout(async () => {
//     if (!isBuilding) {
//       isBuilding = true;
//       console.log("Starting build...");
//       await buildProject();
//       isBuilding = false;
//       clients.forEach(client => client.send("reload"));
//     }
//   }, 1000) as DisposableTimer; // 1 second debounce
  
// }

// async function watchAndRebuild() {
//   watch("./src", { recursive: true }, async (event, filename) => {
//     console.log(`File changed: ${filename}`);
//     await debouncedBuild();
//   });
// }


async function main() {
  await buildProject();
  await startServer();
  // await watchAndRebuild();
}

main().catch(console.error);

console.log("Buns are in the oven.");
