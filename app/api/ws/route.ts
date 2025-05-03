import { WebSocketServer, WebSocket } from 'ws';
import { NextResponse } from 'next/server';
import { IncomingMessage, ServerResponse } from 'http';

let wss: WebSocketServer | null = null;

export async function GET(req: Request) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');

      ws.on('message', (message: Buffer) => {
        console.log('Received:', message.toString());
        ws.send(
          JSON.stringify({
            type: 'message',
            data: message.toString(),
          })
        );
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      ws.send(
        JSON.stringify({
          type: 'connected',
          message: 'Connected to StackZen WebSocket server',
        })
      );
    });
  }

  const upgradeHeader = req.headers.get('upgrade');
  if (!upgradeHeader || upgradeHeader.toLowerCase() !== 'websocket') {
    return new NextResponse('Expected Upgrade: WebSocket', { status: 426 });
  }

  try {
    const res = new NextResponse();
    const socket = await new Promise<WebSocket>((resolve) => {
      const upgradeRes = {
        statusCode: 101,
        headers: {
          Upgrade: 'websocket',
          Connection: 'Upgrade',
          'Sec-WebSocket-Accept': req.headers.get('sec-websocket-key') || '',
        },
      };

      wss?.handleUpgrade(
        req as unknown as IncomingMessage,
        upgradeRes as unknown as ServerResponse,
        Buffer.from([]),
        (ws: WebSocket) => {
          resolve(ws);
        }
      );
    });

    wss?.emit('connection', socket);
    return res;
  } catch (err) {
    console.error('WebSocket upgrade failed:', err);
    return new NextResponse('WebSocket upgrade failed', { status: 500 });
  }
}
