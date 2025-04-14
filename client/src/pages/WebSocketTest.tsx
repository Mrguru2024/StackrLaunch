import { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/use-websocket';

// A simple test page to validate WebSocket functionality
export default function WebSocketTest() {
  const { isConnected, lastMessage, sendMessage, reconnectAttempts } = useWebSocket();
  const [messageText, setMessageText] = useState('');
  const [messageLog, setMessageLog] = useState<string[]>([]);
  
  // Log messages to the UI
  useEffect(() => {
    if (lastMessage) {
      const formattedMessage = typeof lastMessage === 'string' 
        ? lastMessage 
        : JSON.stringify(lastMessage);
      setMessageLog(prev => [...prev, `Received: ${formattedMessage}`]);
    }
  }, [lastMessage]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText && isConnected) {
      const success = sendMessage(messageText);
      if (success) {
        setMessageLog(prev => [...prev, `Sent: ${messageText}`]);
        setMessageText('');
      } else {
        setMessageLog(prev => [...prev, 'Failed to send message: connection not open']);
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">WebSocket Test</h1>
      
      <div className="mb-4 p-3 rounded bg-gray-100 border">
        <p>Connection Status: 
          <span className={isConnected ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {isConnected ? ' Connected' : ' Disconnected'}
          </span>
        </p>
        {!isConnected && (
          <p>Reconnect attempts: {reconnectAttempts}</p>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !messageText}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Send
          </button>
        </div>
      </div>
      
      <div className="border rounded p-3 bg-gray-50 h-80 overflow-y-auto">
        <h2 className="font-bold mb-2">Message Log:</h2>
        {messageLog.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          <ul className="space-y-1">
            {messageLog.map((msg, index) => (
              <li key={index} className={msg.startsWith('Sent') ? 'text-blue-600' : 'text-green-600'}>
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}