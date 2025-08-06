import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { ProgressUpdate } from "@shared/schema";

export interface WebSocketMessage {
  type: string;
  data: any;
  sessionId?: string;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<WebSocket, string> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server,
      path: "/ws"
    });
    this.setupWebSocketServer();
  }

  private setupWebSocketServer(): void {
    this.wss.on("connection", (ws: WebSocket, request) => {
      console.log("New WebSocket connection");

      ws.on("message", (message: Buffer) => {
        try {
          const data = JSON.parse(message.toString()) as WebSocketMessage;
          this.handleMessage(ws, data);
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      });

      ws.on("close", () => {
        this.clients.delete(ws);
        console.log("WebSocket connection closed");
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        this.clients.delete(ws);
      });

      // Send connection confirmation
      this.sendToClient(ws, {
        type: "connection",
        data: { status: "connected", timestamp: new Date() }
      });
    });
  }

  private handleMessage(ws: WebSocket, message: WebSocketMessage): void {
    switch (message.type) {
      case "subscribe":
        if (message.sessionId) {
          this.clients.set(ws, message.sessionId);
          console.log(`Client subscribed to session: ${message.sessionId}`);
        }
        break;
      
      case "ping":
        this.sendToClient(ws, {
          type: "pong",
          data: { timestamp: new Date() }
        });
        break;

      default:
        console.log("Unknown WebSocket message type:", message.type);
    }
  }

  broadcastProgress(progress: ProgressUpdate): void {
    const message: WebSocketMessage = {
      type: "progress",
      data: progress,
      sessionId: progress.sessionId
    };

    // Send to all clients subscribed to this session
    this.clients.forEach((sessionId, ws) => {
      if (sessionId === progress.sessionId) {
        this.sendToClient(ws, message);
      }
    });

    // Also broadcast to all clients (for general updates)
    this.broadcast(message);
  }

  private sendToClient(ws: WebSocket, message: WebSocketMessage): void {
    if (ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    }
  }

  private broadcast(message: WebSocketMessage): void {
    this.wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(message));
        } catch (error) {
          console.error("Error broadcasting WebSocket message:", error);
        }
      }
    });
  }

  getConnectedClientsCount(): number {
    return this.wss.clients.size;
  }

  closeAll(): void {
    this.wss.clients.forEach(ws => {
      ws.close();
    });
    this.wss.close();
  }
}
