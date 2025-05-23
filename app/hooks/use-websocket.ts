'use client';

import { useState, useEffect, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data?: string;
  message?: string;
}

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const sendMessage = useCallback(
    (data: string | WebSocketMessage) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(typeof data === 'string' ? data : JSON.stringify(data));
        return true;
      }
      return false;
    },
    [socket]
  );

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/ws`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
      setIsConnected(true);
      setReconnectAttempts(0);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data) as WebSocketMessage;
        setLastMessage(parsedData);
      } catch {
        setLastMessage({ type: 'message', data: event.data });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setSocket(null);

      const maxReconnectAttempts = 5;
      if (reconnectAttempts < maxReconnectAttempts) {
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
        }, timeout);
      }
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [reconnectAttempts]);

  return {
    socket,
    isConnected,
    lastMessage,
    sendMessage,
    reconnectAttempts,
  };
}
