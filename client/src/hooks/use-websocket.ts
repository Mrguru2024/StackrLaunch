import { useState, useEffect, useCallback } from 'react';

// WebSocket hook that connects to our custom WebSocket endpoint
export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  // Create a memoized send function
  const sendMessage = useCallback((data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(typeof data === 'string' ? data : JSON.stringify(data));
      return true;
    }
    return false;
  }, [socket]);
  
  // Initial connection and reconnection logic
  useEffect(() => {
    // First try to use the global socket if available
    if (window.__stackrSocket && window.__stackrSocket.readyState === WebSocket.OPEN) {
      setSocket(window.__stackrSocket);
      setIsConnected(true);
      return;
    }
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    // Otherwise create a new socket
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected (from hook)');
      setSocket(ws);
      setIsConnected(true);
      setReconnectAttempts(0);
    };
    
    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setLastMessage(parsedData);
      } catch (err) {
        setLastMessage(event.data);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected (from hook)');
      setIsConnected(false);
      setSocket(null);
      
      // Try to reconnect with an exponential backoff
      const maxReconnectAttempts = 5;
      if (reconnectAttempts < maxReconnectAttempts) {
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
        }, timeout);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error (from hook):', error);
    };
    
    // Cleanup function
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
    reconnectAttempts
  };
}

// For TypeScript compatibility
declare global {
  interface Window {
    __stackrSocket?: WebSocket;
  }
}