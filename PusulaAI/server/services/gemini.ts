import { GoogleGenAI } from "@google/genai";
import { GeminiAnalysis, CareerMatch } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || ""
});

export class GeminiAnalysisService {
  async analyzeVideoTranscript(transcript: string, videoTitle?: string): Promise<GeminiAnalysis> {
    try {
      const systemPrompt = `Sen Türkiye eğitim sisteminde uzman bir kariyer danışmanısın. 
      YouTube videosundaki eğitim içeriklerini analiz ederek öğrencilerin gerçek hayat kariyer bağlantılarını keşfediyorsun.

      Video transkriptini analiz et ve şu bilgileri çıkar:
      1. Ana konular (teknik ve akademik konuların listesi)
      2. İlgili sektörler (bu konuların kullanıldığı endüstri alanları)
      3. Yetkinlik gereksinimleri (bu alanda çalışmak için gerekli beceriler)
      4. Türkiye iş pazarı uyumu (Yüksek/Orta/Düşük)
      5. Detaylı analiz (öğrenci için açıklayıcı paragraf)

      JSON formatında yanıtla.`;

      const prompt = `${videoTitle ? `Video Başlığı: ${videoTitle}\n\n` : ''}Transkript:\n${transcript}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              mainTopics: { 
                type: "array", 
                items: { type: "string" }
              },
              relatedSectors: { 
                type: "array", 
                items: { type: "string" }
              },
              competencyRequirements: { 
                type: "array", 
                items: { type: "string" }
              },
              turkeyJobMarketFit: { 
                type: "string", 
                enum: ["Yüksek", "Orta", "Düşük"]
              },
              detailedAnalysis: { 
                type: "string" 
              }
            },
            required: ["mainTopics", "relatedSectors", "competencyRequirements", "turkeyJobMarketFit", "detailedAnalysis"]
          }
        },
        contents: prompt,
      });

      const rawJson = response.text;
      if (!rawJson) {
        throw new Error("Gemini'den boş yanıt alındı");
      }

      return JSON.parse(rawJson) as GeminiAnalysis;
    } catch (error) {
      console.error("Gemini analiz hatası:", error);
      throw new Error(`Video analizi başarısız: ${error}`);
    }
  }

  async matchCareersToTopics(analysis: GeminiAnalysis): Promise<CareerMatch[]> {
    try {
      const systemPrompt = `Sen Türkiye'deki kariyer fırsatları konusunda uzman bir danışmansın.
      Video analizine dayanarak en uygun 5 kariyer alanını belirle ve her biri için detaylı bilgi ver.
      
      Her kariyer için şunları belirt:
      1. Kariyer adı
      2. Eşleşme skoru (0-100)
      3. Neden uygun olduğunu açıklayan gerekçe
      4. Gerekli beceriler listesi
      5. Kariyer yolu adımları
      6. Bu alanda çalışabilecek örnek şirketler (Türkiye'deki)

      JSON formatında yanıtla.`;

      const prompt = `Analiz Sonuçları:
Ana Konular: ${analysis.mainTopics.join(', ')}
İlgili Sektörler: ${analysis.relatedSectors.join(', ')}
Yetkinlik Gereksinimleri: ${analysis.competencyRequirements.join(', ')}
İş Pazarı Uyumu: ${analysis.turkeyJobMarketFit}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                career: { type: "string" },
                matchScore: { type: "number" },
                reasoning: { type: "string" },
                requiredSkills: { 
                  type: "array", 
                  items: { type: "string" }
                },
                careerPath: { 
                  type: "array", 
                  items: { type: "string" }
                },
                companies: { 
                  type: "array", 
                  items: { type: "string" }
                }
              },
              required: ["career", "matchScore", "reasoning", "requiredSkills", "careerPath", "companies"]
            }
          }
        },
        contents: prompt,
      });

      const rawJson = response.text;
      if (!rawJson) {
        throw new Error("Kariyer eşleştirme yanıtı boş");
      }

      return JSON.parse(rawJson) as CareerMatch[];
    } catch (error) {
      console.error("Kariyer eşleştirme hatası:", error);
      throw new Error(`Kariyer analizi başarısız: ${error}`);
    }
  }

  async generateStudentReport(
    videoTitle: string,
    analysis: GeminiAnalysis, 
    careerMatches: CareerMatch[],
    btkCourses: any[]
  ): Promise<any> {
    try {
      const systemPrompt = `Sen öğrencilere yönelik kariyer rehberi hazırlayan bir uzmansın.
      Analiz sonuçlarına dayanarak kapsamlı bir öğrenci raporu hazırla.
      
      Raporda şunlar olsun:
      1. Video konusu özeti
      2. Tespit edilen ana konular
      3. Önerilen kariyer alanları (en yüksek skorlu 3 tanesi)
      4. Önerilen kurslar
      5. Kariyer yol haritası (başlık, adımlar, zaman çizelgesi)
      6. Beceri geliştirme önerileri (teknik ve soft skill)
      7. Bir sonraki adımlar

      Samimi, motive edici ve Türkçe bir ton kullan.`;

      const prompt = `Video: ${videoTitle}
Analiz: ${JSON.stringify(analysis)}
Kariyer Eşleştirmeleri: ${JSON.stringify(careerMatches)}
BTK Kursları: ${JSON.stringify(btkCourses)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt
        },
        contents: prompt,
      });

      return {
        videoTopic: videoTitle,
        mainTopics: analysis.mainTopics,
        careerAreas: careerMatches.slice(0, 3),
        recommendedCourses: btkCourses,
        content: response.text
      };
    } catch (error) {
      console.error("Öğrenci raporu oluşturma hatası:", error);
      throw new Error(`Öğrenci raporu oluşturulamadı: ${error}`);
    }
  }

  async generateParentReport(
    videoTitle: string,
    analysis: GeminiAnalysis,
    careerMatches: CareerMatch[]
  ): Promise<any> {
    try {
      const systemPrompt = `Sen veliler için kariyer rehberi hazırlayan bir uzmansın.
      Analiz sonuçlarına dayanarak velilere yönelik bir destek kılavuzu hazırla.
      
      Raporda şunlar olsun:
      1. Çocuğun ilgi alanları
      2. Kariyer potansiyeli değerlendirmesi
      3. Nasıl destekleyebileceğinize dair öneriler
      4. Üniversite bölüm önerileri
      5. Evde yapılabilecek aktiviteler
      6. Geliştirilmesi gereken alanlar
      7. Sektör hakkında bilgiler

      Anlayışlı, destekleyici ve pratik bir ton kullan.`;

      const prompt = `Video: ${videoTitle}
Analiz: ${JSON.stringify(analysis)}
Kariyer Eşleştirmeleri: ${JSON.stringify(careerMatches)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt
        },
        contents: prompt,
      });

      return {
        childInterests: analysis.mainTopics,
        content: response.text
      };
    } catch (error) {
      console.error("Veli raporu oluşturma hatası:", error);
      throw new Error(`Veli raporu oluşturulamadı: ${error}`);
    }
  }
}

export const geminiService = new GeminiAnalysisService();
