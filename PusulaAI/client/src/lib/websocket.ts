export interface WebSocketMessage {
  type: string;
  data: any;
  sessionId?: string;
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private isReconnecting = false;

  // Event handlers
  private onOpenHandler?: () => void;
  private onMessageHandler?: (event: MessageEvent) => void;
  private onCloseHandler?: () => void;
  private onErrorHandler?: (event: Event) => void;

  constructor(url: string) {
    this.url = this.normalizeUrl(url);
    this.connect();
  }

  private normalizeUrl(url: string): string {
    // Convert HTTP URLs to WebSocket URLs
    if (url.startsWith('http://')) {
      return url.replace('http://', 'ws://');
    } else if (url.startsWith('https://')) {
      return url.replace('https://', 'wss://');
    }
    
    // If it's a relative URL, construct the full WebSocket URL
    if (url.startsWith('/')) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//${window.location.host}${url}`;
    }
    
    return url;
  }

  private connect(): void {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected to:', this.url);
        this.reconnectAttempts = 0;
        this.isReconnecting = false;
        this.onOpenHandler?.();
      };

      this.ws.onmessage = (event) => {
        this.onMessageHandler?.(event);
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.ws = null;
        this.onCloseHandler?.();
        
        // Attempt to reconnect if not manually closed
        if (!this.isReconnecting && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect();
        }
      };

      this.ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        this.onErrorHandler?.(event);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.onErrorHandler?.(error as Event);
    }
  }

  private attemptReconnect(): void {
    if (this.isReconnecting) return;
    
    this.isReconnecting = true;
    this.reconnectAttempts++;
    
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }

  public send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  }

  public close(): void {
    this.isReconnecting = false;
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // Event handler setters
  public onOpen(handler: () => void): void {
    this.onOpenHandler = handler;
  }

  public onMessage(handler: (event: MessageEvent) => void): void {
    this.onMessageHandler = handler;
  }

  public onClose(handler: () => void): void {
    this.onCloseHandler = handler;
  }

  public onError(handler: (event: Event) => void): void {
    this.onErrorHandler = handler;
  }

  // Subscribe to a specific session
  public subscribeToSession(sessionId: string): void {
    this.send({
      type: 'subscribe',
      sessionId,
      data: { action: 'subscribe' }
    });
  }

  // Send a ping to keep connection alive
  public ping(): void {
    this.send({
      type: 'ping',
      data: { timestamp: Date.now() }
    });
  }
}

// Utility function to create WebSocket connection
export function createWebSocketConnection(url: string): WebSocketClient {
  return new WebSocketClient(url);
}

// Export WebSocket ready states for convenience
export const WebSocketReadyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
} as const;
