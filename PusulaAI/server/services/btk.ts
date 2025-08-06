import { BTKCourse } from "@shared/schema";

export class BTKService {
  private baseUrl: string = "https://www.btkakademi.gov.tr";

  async searchCourses(keywords: string[]): Promise<BTKCourse[]> {
    try {
      // In a real implementation, this would call BTK Academy's API
      // For now, we'll return mock data based on common keywords
      
      const mockCourses = await this.getMockBTKCourses();
      
      // Filter courses based on keywords
      const relevantCourses = mockCourses.filter(course => 
        keywords.some(keyword => 
          course.title.toLowerCase().includes(keyword.toLowerCase()) ||
          course.description.toLowerCase().includes(keyword.toLowerCase()) ||
          course.keywords?.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
        )
      );

      return relevantCourses.slice(0, 5); // Return top 5 matches
    } catch (error) {
      console.error("BTK kurs arama hatası:", error);
      return [];
    }
  }

  async getCoursesByCategory(category: string): Promise<BTKCourse[]> {
    try {
      const allCourses = await this.getMockBTKCourses();
      return allCourses.filter(course => 
        course.category.toLowerCase().includes(category.toLowerCase())
      ).slice(0, 10);
    } catch (error) {
      console.error("BTK kategori arama hatası:", error);
      return [];
    }
  }

  private async getMockBTKCourses(): Promise<BTKCourse[]> {
    // This would be replaced with actual API calls in production
    return [
      {
        id: "btk-1",
        title: "Python ile Makine Öğrenmesi",
        description: "Python programlama dili kullanarak makine öğrenmesi algoritmalarını öğrenin",
        category: "Yazılım",
        keywords: ["python", "makine öğrenmesi", "veri bilimi", "algoritma"],
        duration: "40 saat",
        level: "Orta",
        url: "https://www.btkakademi.gov.tr/portal/course/python-ile-makine-ogrenmesi",
        isActive: true
      },
      {
        id: "btk-2",
        title: "Veri Bilimi için Python ve TensorFlow",
        description: "TensorFlow kütüphanesi ile derin öğrenme projelerini geliştirin",
        category: "Yazılım",
        keywords: ["python", "tensorflow", "derin öğrenme", "veri bilimi"],
        duration: "60 saat",
        level: "İleri",
        url: "https://www.btkakademi.gov.tr/portal/course/veri-bilimi-python-tensorflow",
        isActive: true
      },
      {
        id: "btk-3",
        title: "Coğrafi Bilgi Sistemleri (CBS)",
        description: "CBS yazılımları ve haritacılık uygulamalarını öğrenin",
        category: "Coğrafya",
        keywords: ["cbs", "gis", "harita", "coğrafya", "analiz"],
        duration: "35 saat",
        level: "Başlangıç",
        url: "https://www.btkakademi.gov.tr/portal/course/cbs",
        isActive: true
      },
      {
        id: "btk-4",
        title: "İklim Veri Analizi",
        description: "Meteoroloji verileri analizi ve iklim modelleme",
        category: "Bilim",
        keywords: ["iklim", "meteoroloji", "veri analizi", "çevre"],
        duration: "25 saat",
        level: "Orta",
        url: "https://www.btkakademi.gov.tr/portal/course/iklim-veri-analizi",
        isActive: true
      },
      {
        id: "btk-5",
        title: "Biyoinformatik Temelleri",
        description: "Biyolojik verilerin bilgisayar destekli analizi",
        category: "Biyoloji",
        keywords: ["biyoinformatik", "biyoloji", "genetik", "analiz"],
        duration: "45 saat",
        level: "İleri",
        url: "https://www.btkakademi.gov.tr/portal/course/biyoinformatik",
        isActive: true
      },
      {
        id: "btk-6",
        title: "Yapay Zeka Etiği ve Uygulamaları",
        description: "AI teknolojilerinin etik kullanımı ve uygulamaları",
        category: "Teknoloji",
        keywords: ["yapay zeka", "ai", "etik", "teknoloji"],
        duration: "20 saat",
        level: "Başlangıç",
        url: "https://www.btkakademi.gov.tr/portal/course/ai-etik",
        isActive: true
      },
      {
        id: "btk-7",
        title: "Su Kaynakları Yönetimi",
        description: "Su kaynaklarının sürdürülebilir yönetimi ve korunması",
        category: "Çevre",
        keywords: ["su", "çevre", "sürdürülebilirlik", "kaynak yönetimi"],
        duration: "30 saat",
        level: "Orta",
        url: "https://www.btkakademi.gov.tr/portal/course/su-kaynaklari",
        isActive: true
      },
      {
        id: "btk-8",
        title: "Mikrobiyoloji Laboratuvar Teknikleri",
        description: "Modern mikrobiyoloji laboratuvarında kullanılan teknikler",
        category: "Biyoloji",
        keywords: ["mikrobiyoloji", "laboratuvar", "teknik", "analiz"],
        duration: "40 saat",
        level: "İleri",
        url: "https://www.btkakademi.gov.tr/portal/course/mikrobiyoloji-lab",
        isActive: true
      }
    ];
  }
}

export const btkService = new BTKService();
