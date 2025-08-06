import { AnalysisSession, GeminiAnalysis, CareerMatch, StudentReport, ParentReport } from "@shared/schema";
import { storage } from "../storage";
import { youtubeService } from "./youtube";
import { geminiService } from "./gemini";
import { btkService } from "./btk";
import { WebSocketService } from "./websocket";

export class AnalysisService {
  private wsService: WebSocketService;

  constructor(wsService: WebSocketService) {
    this.wsService = wsService;
  }

  async startAnalysis(youtubeUrl: string): Promise<string> {
    try {
      // Create analysis session
      const session = await storage.createAnalysisSession({ youtubeUrl });
      
      // Start background processing
      this.processAnalysisAsync(session.id, youtubeUrl);
      
      return session.id;
    } catch (error) {
      console.error("Analiz başlatma hatası:", error);
      throw new Error(`Analiz başlatılamadı: ${error}`);
    }
  }

  private async processAnalysisAsync(sessionId: string, youtubeUrl: string): Promise<void> {
    try {
      // Step 1: Link received
      await this.sendProgress(sessionId, 1, "Linki aldık", {
        message: "YouTube bağlantısı sisteme başarıyla alındı",
        status: "completed"
      });

      // Step 2: Extract transcript
      await this.sendProgress(sessionId, 2, "Transkript çıkarılıyor", {
        message: "Video içeriği metne dönüştürülüyor...",
        status: "processing"
      });

      const videoDetails = await youtubeService.getVideoDetails(youtubeUrl);
      const transcript = await youtubeService.extractTranscript(youtubeUrl);
      
      await storage.updateAnalysisSession(sessionId, {
        videoTitle: videoDetails.title,
        transcript,
        currentStep: 2
      });

      await this.sendProgress(sessionId, 2, "Transkript çıkarıldı", {
        message: "Video içeriği başarıyla metne dönüştürüldü",
        status: "completed"
      });

      // Step 3: Gemini analysis
      await this.sendProgress(sessionId, 3, "Gemini analizi yapılıyor", {
        message: "AI konuları ve kariyer bağlantılarını analiz ediyor",
        status: "processing"
      });

      const geminiAnalysis = await geminiService.analyzeVideoTranscript(transcript, videoDetails.title);
      
      await storage.updateAnalysisSession(sessionId, {
        geminiAnalysis,
        currentStep: 3
      });

      await this.sendProgress(sessionId, 3, "Gemini analizi tamamlandı", {
        message: "AI analizi başarıyla tamamlandı",
        status: "completed",
        analysis: geminiAnalysis
      });

      // Step 4: Career matching
      await this.sendProgress(sessionId, 4, "Kariyer eşleştirmesi", {
        message: "Konular meslek alanlarıyla ilişkilendiriliyor",
        status: "processing"
      });

      const careerMatches = await geminiService.matchCareersToTopics(geminiAnalysis);
      
      await storage.updateAnalysisSession(sessionId, {
        careerMatches,
        currentStep: 4
      });

      await this.sendProgress(sessionId, 4, "Kariyer eşleştirmesi tamamlandı", {
        message: "Meslek alanları başarıyla eşleştirildi",
        status: "completed"
      });

      // Step 5: BTK recommendations
      await this.sendProgress(sessionId, 5, "BTK önerileri hazırlanıyor", {
        message: "İlgini çekebilecek kurslar aranıyor",
        status: "processing"
      });

      const btkCourses = await btkService.searchCourses(geminiAnalysis.mainTopics);
      
      await storage.updateAnalysisSession(sessionId, {
        btkRecommendations: btkCourses,
        currentStep: 5
      });

      await this.sendProgress(sessionId, 5, "BTK önerileri hazırlandı", {
        message: "Kurs önerileri belirlendi",
        status: "completed"
      });

      // Step 6: Student report generation
      await this.sendProgress(sessionId, 6, "Öğrenci raporu oluşturuluyor", {
        message: "Sana özel kariyer rehberi hazırlanıyor",
        status: "processing"
      });

      const studentReport = await geminiService.generateStudentReport(
        videoDetails.title,
        geminiAnalysis,
        careerMatches,
        btkCourses
      );

      await storage.updateAnalysisSession(sessionId, {
        studentReport,
        currentStep: 6
      });

      await this.sendProgress(sessionId, 6, "Öğrenci raporu oluşturuldu", {
        message: "Kişisel kariyer rehberin hazır",
        status: "completed"
      });

      // Step 7: Parent report generation
      await this.sendProgress(sessionId, 7, "Veli raporu oluşturuluyor", {
        message: "Aileler için destek kılavuzu oluşturuluyor",
        status: "processing"
      });

      const parentReport = await geminiService.generateParentReport(
        videoDetails.title,
        geminiAnalysis,
        careerMatches
      );

      await storage.updateAnalysisSession(sessionId, {
        parentReport,
        currentStep: 7,
        status: "completed",
        completedAt: new Date()
      });

      await this.sendProgress(sessionId, 7, "Analiz tamamlandı!", {
        message: "Tüm raporlar hazır. Artık inceleyebilirsin!",
        status: "completed",
        analysisComplete: true
      });

    } catch (error) {
      console.error(`Analiz hatası (Session: ${sessionId}):`, error);
      
      await storage.updateAnalysisSession(sessionId, {
        status: "failed"
      });

      await this.sendProgress(sessionId, -1, "Analiz başarısız", {
        message: `Bir hata oluştu: ${error}`,
        status: "error"
      });
    }
  }

  async sendProgress(sessionId: string, step: number, message: string, details?: any): Promise<void> {
    // Save to database
    await storage.addProgressUpdate(sessionId, {
      step,
      message,
      details
    });

    // Send via WebSocket
    this.wsService.broadcastProgress({
      sessionId,
      step,
      message,
      timestamp: new Date(),
      details
    });
  }

  async getAnalysisStatus(sessionId: string): Promise<AnalysisSession | null> {
    const session = await storage.getAnalysisSession(sessionId);
    return session || null;
  }
}
