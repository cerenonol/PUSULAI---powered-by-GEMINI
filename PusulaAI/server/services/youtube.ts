export class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || process.env.GOOGLE_API_KEY || "";
  }

  validateYouTubeURL(url: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return regex.test(url);
  }

  extractVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async getVideoDetails(url: string): Promise<{ title: string; description: string; duration: string }> {
    try {
      if (!this.validateYouTubeURL(url)) {
        throw new Error("Geçersiz YouTube URL");
      }

      const videoId = this.extractVideoId(url);
      if (!videoId) {
        throw new Error("Video ID çıkarılamadı");
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`YouTube API hatası: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error("Video bulunamadı");
      }

      const video = data.items[0];
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        duration: video.contentDetails.duration
      };
    } catch (error) {
      console.error("YouTube video detayları alınamadı:", error);
      throw error;
    }
  }

  async extractTranscript(url: string): Promise<string> {
    try {
      const videoDetails = await this.getVideoDetails(url);
      const videoId = this.extractVideoId(url);
      
      if (!videoId) {
        throw new Error("Video ID çıkarılamadı");
      }

      // Try to get transcript using youtube-transcript package
      try {
        const { YoutubeTranscript } = await import('youtube-transcript');
        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'tr' });
        
        if (transcriptArray && transcriptArray.length > 0) {
          const fullTranscript = transcriptArray
            .map(item => item.text)
            .join(' ')
            .replace(/\[.*?\]/g, '') // Remove bracketed content like [Music]
            .trim();
          
          if (fullTranscript.length > 50) {
            return fullTranscript;
          }
        }
      } catch (transcriptError) {
        console.log("Türkçe transcript bulunamadı, İngilizce deneniyor...");
        
        // Try English if Turkish is not available
        try {
          const { YoutubeTranscript } = await import('youtube-transcript');
          const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
          
          if (transcriptArray && transcriptArray.length > 0) {
            const fullTranscript = transcriptArray
              .map(item => item.text)
              .join(' ')
              .replace(/\[.*?\]/g, '')
              .trim();
            
            if (fullTranscript.length > 50) {
              return fullTranscript;
            }
          }
        } catch (englishError) {
          console.log("İngilizce transcript de bulunamadı, video açıklaması kullanılıyor...");
        }
      }

      // Fallback to video description if transcript is not available
      if (videoDetails.description && videoDetails.description.length > 100) {
        return `Video Açıklaması (Transcript Mevcut Değil): ${videoDetails.description}`;
      }

      // Final fallback with basic video info
      return `Video Başlığı: "${videoDetails.title}"\nVideo Süresi: ${this.formatDuration(videoDetails.duration)}\n\nBu video için otomatik transcript mevcut değil. Analiz video başlığı ve mevcut açıklama üzerinden yapılacak.\n\nAçıklama: ${videoDetails.description || 'Açıklama mevcut değil'}`;
    } catch (error) {
      console.error("Transcript çıkarma hatası:", error);
      throw new Error(`Video transcript'i alınamadı: ${error}`);
    }
  }

  formatDuration(duration: string): string {
    // Convert ISO 8601 duration to readable format
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "Bilinmeyen";

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    let formatted = "";
    if (hours > 0) formatted += `${hours}s `;
    if (minutes > 0) formatted += `${minutes}dk `;
    if (seconds > 0 && hours === 0) formatted += `${seconds}sn`;

    return formatted.trim();
  }
}

export const youtubeService = new YouTubeService();
