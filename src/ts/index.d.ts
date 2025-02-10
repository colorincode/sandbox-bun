declare module '*.scss' {
    const styles: {
      readonly [key: string]: string
    }
    export default styles
  }

  // make TypeScript happy
declare global {
  var count: number;
}



declare module "bun" {
  interface WebSocketHandler<T> {
    message(ws: ServerWebSocket<T>, message: string | Uint8Array): void | Promise<void>;
    open(ws: ServerWebSocket<T>): void | Promise<void>;
    close(ws: ServerWebSocket<T>, code: number, reason: string): void | Promise<void>;
    drain(ws: ServerWebSocket<T>): void | Promise<void>;
  }

  interface Server {
    port: number;
  }
}
