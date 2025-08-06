import { useEffect, useRef, useState } from 'react';
import { WebSocketClient } from '@/lib/websocket';

interface UseWebSocketOptions {
  reconnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface UseWebSocketReturn {
  socket: WebSocketClient | null;
  lastMessage: MessageEvent | null;
  connectionStatus: 'Connecting' | 'Connected' | 'Disconnected' | 'Error';
  sendMessage: (message: any) => void;
}

export function useWebSocket(url?: string, options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    reconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000
  } = options;

  const [socket, setSocket] = useState<WebSocketClient | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Connected' | 'Disconnected' | 'Error'>('Disconnected');
  
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReconnectRef = useRef(reconnect);

  useEffect(() => {
    if (!url) return;

    const connectWebSocket = () => {
      try {
        setConnectionStatus('Connecting');
        
        const ws = new WebSocketClient(url);
        
        ws.onOpen(() => {
          setConnectionStatus('Connected');
          reconnectAttemptsRef.current = 0;
          setSocket(ws);
        });

        ws.onMessage((event) => {
          setLastMessage(event);
        });

        ws.onClose(() => {
          setConnectionStatus('Disconnected');
          setSocket(null);
          
          // Attempt reconnection if enabled
          if (shouldReconnectRef.current && reconnectAttemptsRef.current < reconnectAttempts) {
            reconnectAttemptsRef.current++;
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, reconnectInterval);
          }
        });

        ws.onError((error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('Error');
        });

        return ws;
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setConnectionStatus('Error');
        return null;
      }
    };

    const websocket = connectWebSocket();

    return () => {
      shouldReconnectRef.current = false;
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (websocket) {
        websocket.close();
      }
    };
  }, [url, reconnectAttempts, reconnectInterval]);

  const sendMessage = (message: any) => {
    if (socket && connectionStatus === 'Connected') {
      socket.send(message);
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  };

  return {
    socket,
    lastMessage,
    connectionStatus,
    sendMessage
  };
}
