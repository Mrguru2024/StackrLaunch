declare module 'ws' {
  import { Server as HttpServer } from 'http';
  import { Server as HttpsServer } from 'https';
  import { EventEmitter } from 'events';

  export class WebSocketServer extends EventEmitter {
    constructor(options?: WebSocketServerOptions);
    close(cb?: () => void): void;
    handleUpgrade(
      request: any,
      socket: any,
      upgradeHead: Buffer,
      callback: (client: WebSocket) => void
    ): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  export interface WebSocketServerOptions {
    host?: string;
    port?: number;
    server?: HttpServer | HttpsServer;
    path?: string;
    noServer?: boolean;
    clientTracking?: boolean;
    perMessageDeflate?: boolean | PerMessageDeflateOptions;
    maxPayload?: number;
  }

  export interface PerMessageDeflateOptions {
    serverNoContextTakeover?: boolean;
    clientNoContextTakeover?: boolean;
    serverMaxWindowBits?: number;
    clientMaxWindowBits?: number;
    zlibInflateOptions?: {
      chunkSize?: number;
    };
    zlibDeflateOptions?: {
      level?: number;
    };
    threshold?: number;
    concurrencyLimit?: number;
  }

  export class WebSocket extends EventEmitter {
    constructor(address: string, options?: WebSocketClientOptions);
    close(code?: number, data?: string): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    send(data: any, cb?: (err?: Error) => void): void;
    terminate(): void;
    readyState: number;
    url: string;
    protocol: string;
    extensions: string;
    CONNECTING: number;
    OPEN: number;
    CLOSING: number;
    CLOSED: number;
  }

  export interface WebSocketClientOptions {
    protocol?: string | string[];
    handshakeTimeout?: number;
    perMessageDeflate?: boolean | PerMessageDeflateOptions;
    maxPayload?: number;
    followRedirects?: boolean;
    headers?: { [key: string]: string };
  }
}
