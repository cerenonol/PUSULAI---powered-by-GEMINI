# PUSULAI---powered-by-GEMINI
# PusulaAI - Eğitimde Yapay Zeka Destekli Kişiselleştirilmiş Kariyer Analizi Platformu
Proje Hakkında
PusulaAI, öğrencilerin YouTube eğitim içeriklerini yapay zeka ile analiz ederek kariyer yönelimlerini ve eğitim ihtiyaçlarını belirleyen, gerçek zamanlı geri bildirim ve raporlar sunan yenilikçi bir eğitim teknolojisi platformudur. Türkiye eğitim sistemi ve iş piyasası dinamiklerine uygun olarak tasarlanan PusulaAI, öğrencilerin motivasyonunu artıran ve velilerin süreci desteklemesini kolaylaştıran kapsamlı raporlar üretir.

# Neden PusulaAI?
Günümüzde öğrencilerin kariyer tercihleri ve eğitim yolları giderek karmaşıklaşıyor. Standart değerlendirme yöntemleri, bireysel farklılıkları göz önünde bulundurmada yetersiz kalıyor. PusulaAI, yapay zeka destekli içerik analiziyle öğrencinin ilgi alanlarını, öğrenme hızını ve hedeflerini doğru şekilde ortaya koyar. Böylece hem öğrenciye hem de aileye kişiselleştirilmiş yol haritası sunar.

# Temel Özellikler
YouTube Video Analizi: Öğrencinin seçtiği YouTube eğitim videolarından otomatik olarak transcript çıkarma ve detaylı içerik analizi.

Çok Dilli Transcript Desteği: Öncelikle Türkçe, yoksa İngilizce transcript otomatik seçimi.

Yapay Zeka Analizi: Google Gemini AI modeli kullanarak içerik temalarını, sektör bağlantılarını ve kariyer önerilerini çıkarma.

Gerçek Zamanlı Takip: WebSocket ile analiz sürecinde anlık ilerleme ve durum güncellemeleri.

Kapsamlı Raporlama: Öğrenci ve veli için ayrı, motivasyonel ve eğitim odaklı raporlar.

BTK Akademi Entegrasyonu: İlgili BTK kursları önerilerek Türkiye eğitim ekosistemine tam uyum.

Kalıcı Veri Depolama: PostgreSQL veritabanı ile analiz oturumlarının ve sonuçlarının güvenli saklanması.

Responsive ve Kullanıcı Dostu Arayüz: React + TypeScript ile hızlı, şık ve erişilebilir frontend tasarımı.

# Sistem Mimarisi
# Frontend
React & TypeScript: Component-based yapı, kodun sürdürülebilirliği ve hatasızlığı.

Tailwind CSS: Responsive ve modern UI tasarımı.

TanStack Query: API yanıtlarının verimli cachelenmesi.

WebSocket: Real-time analiz ilerleme takibi.

# Backend
Node.js & Express: REST API ve WebSocket sunucusu.

PostgreSQL (Neon Serverless): Ölçeklenebilir ve güvenilir veri tabanı.

Drizzle ORM: Type-safe veritabanı işlemleri.

Google Gemini AI: İçerik analizi ve rapor oluşturma.

# Kullanım Senaryosu
Kullanıcı YouTube eğitim videosunun linkini girer.

Sistem videodan transcript alır ve içeriği Gemini AI modeline gönderir.

AI analizini yapar, anahtar kavramları çıkarır, ilgili sektör ve kariyer önerilerini belirler.

WebSocket üzerinden kullanıcıya analiz sürecini gerçek zamanlı bildirir.

Analiz tamamlandığında öğrenci ve veliye yönelik motivasyonel ve destekleyici raporlar üretilir.

İlgili BTK kursları önerilir, eğitim yol haritası kişiselleştirilir.

Kurulum ve Çalıştırma
Gereksinimler
Node.js v18+

PostgreSQL (Neon Serverless önerilir)

Google API Anahtarı (YouTube Data API için)

Gemini AI API erişimi

Adımlar
bash
Kopyala
Düzenle
git clone https://github.com/senin-kullanici-adi/pusula-ai.git
cd pusula-ai

# Backend kurulumu
cd backend
npm install
cp .env.example .env
# .env dosyasına gerekli API anahtarları ve veritabanı bilgilerini ekle
npm run dev


# Katkıda Bulunma
PusulaAI, eğitimde yapay zekanın potansiyelini artırmak için açık ve işbirliğine açık bir projedir. Katkılarınızı memnuniyetle karşılarız. Lütfen:

Yeni özellik önerileri için issue açın.

Kod katkılarınızı fork ederek pull request oluşturun.

Kod standartlarına ve testlere dikkat edin.

# Lisans
Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakabilirsiniz.


 # İletişim
Sorularınız için:

E-posta:cerenconol@gmail.com

# Teşekkürler
Bu proje BTK Akademi & Google & Girişimcilik Vakfı Hackhaton 2025 için ve açık kaynak topluluğunun katkılarıyla geliştirilmiştir.
