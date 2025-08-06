import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisSessionSchema } from "@shared/schema";
import { AnalysisService } from "./services/analysis";
import { WebSocketService } from "./services/websocket";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize WebSocket service
  const wsService = new WebSocketService(httpServer);
  
  // Initialize Analysis service with WebSocket
  const analysisService = new AnalysisService(wsService);

  // Start YouTube analysis
  app.post("/api/analysis/start", async (req, res) => {
    try {
      const validatedData = insertAnalysisSessionSchema.parse(req.body);
      const sessionId = await analysisService.startAnalysis(validatedData.youtubeUrl);
      
      res.json({ 
        success: true, 
        sessionId,
        message: "Analiz başlatıldı"
      });
    } catch (error: any) {
      console.error("Analysis start error:", error);
      res.status(400).json({ 
        success: false, 
        message: error.message || "Analiz başlatılamadı"
      });
    }
  });

  // Get analysis status
  app.get("/api/analysis/:sessionId/status", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await analysisService.getAnalysisStatus(sessionId);
      
      if (!session) {
        return res.status(404).json({
          success: false,
          message: "Analiz oturumu bulunamadı"
        });
      }

      res.json({
        success: true,
        session: {
          id: session.id,
          youtubeUrl: session.youtubeUrl,
          videoTitle: session.videoTitle,
          status: session.status,
          currentStep: session.currentStep,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
          completedAt: session.completedAt
        }
      });
    } catch (error: any) {
      console.error("Analysis status error:", error);
      res.status(500).json({
        success: false,
        message: "Durum bilgisi alınamadı"
      });
    }
  });

  // Get progress updates for a session
  app.get("/api/analysis/:sessionId/progress", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const progress = await storage.getProgressUpdates(sessionId);
      
      res.json({
        success: true,
        progress
      });
    } catch (error: any) {
      console.error("Progress fetch error:", error);
      res.status(500).json({
        success: false,
        message: "İlerleme bilgisi alınamadı"
      });
    }
  });

  // Get complete analysis results
  app.get("/api/analysis/:sessionId/results", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getAnalysisSession(sessionId);
      
      if (!session) {
        return res.status(404).json({
          success: false,
          message: "Analiz oturumu bulunamadı"
        });
      }

      if (session.status !== "completed") {
        return res.status(400).json({
          success: false,
          message: "Analiz henüz tamamlanmadı"
        });
      }

      res.json({
        success: true,
        results: {
          videoTitle: session.videoTitle,
          geminiAnalysis: session.geminiAnalysis,
          careerMatches: session.careerMatches,
          btkRecommendations: session.btkRecommendations,
          studentReport: session.studentReport,
          parentReport: session.parentReport,
          completedAt: session.completedAt
        }
      });
    } catch (error: any) {
      console.error("Results fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Sonuçlar alınamadı"
      });
    }
  });

  // Get student report
  app.get("/api/analysis/:sessionId/student-report", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getAnalysisSession(sessionId);
      
      if (!session?.studentReport) {
        return res.status(404).json({
          success: false,
          message: "Öğrenci raporu bulunamadı"
        });
      }

      res.json({
        success: true,
        report: session.studentReport
      });
    } catch (error: any) {
      console.error("Student report fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Öğrenci raporu alınamadı"
      });
    }
  });

  // Get parent report
  app.get("/api/analysis/:sessionId/parent-report", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getAnalysisSession(sessionId);
      
      if (!session?.parentReport) {
        return res.status(404).json({
          success: false,
          message: "Veli raporu bulunamadı"
        });
      }

      res.json({
        success: true,
        report: session.parentReport
      });
    } catch (error: any) {
      console.error("Parent report fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Veli raporu alınamadı"
      });
    }
  });

  // WebSocket info endpoint
  app.get("/api/websocket/info", (req, res) => {
    res.json({
      success: true,
      connectedClients: wsService.getConnectedClientsCount(),
      message: "WebSocket servisi çalışıyor"
    });
  });

  return httpServer;
}
