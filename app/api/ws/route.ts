import { WebSocketServer, WebSocket } from 'ws';
import { NextResponse } from 'next/server';

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

  const { socket: ws, response } = await new Promise<{
    socket: WebSocket;
    response: Response;
  }>((resolve) => {
    const res = new NextResponse(null, {
      status: 101,
      headers: {
        Upgrade: 'websocket',
        Connection: 'Upgrade',
      },
    });

    resolve({
      socket: (res as { socket: WebSocket }).socket,
      response: res,
    });
  });

  wss.handleUpgrade(req, ws, Buffer.from([]), (ws: WebSocket) => {
    wss?.emit('connection', ws);
  });

  return response;
}
