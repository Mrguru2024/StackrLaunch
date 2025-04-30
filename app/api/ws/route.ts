import { WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';

let wss: WebSocketServer | null = null;

export async function GET(req: Request) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        console.log('Received:', message.toString());
        ws.send(
          JSON.stringify({
            type: 'response',
            message: `Server received: ${message}`,
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

  return new NextResponse('WebSocket server is running', {
    status: 200,
    headers: {
      Upgrade: 'websocket',
      Connection: 'Upgrade',
    },
  });
}
