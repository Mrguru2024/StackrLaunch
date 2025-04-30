import { WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';

let wss: WebSocketServer | null = null;

export async function GET(req: Request) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
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
    socket: any;
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
      socket: (res as any).socket,
      response: res,
    });
  });

  wss.handleUpgrade(req, ws, Buffer.from([]), (ws) => {
    wss?.emit('connection', ws);
  });

  return response;
}
