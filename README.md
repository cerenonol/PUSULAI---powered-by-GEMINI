# PUSULAI---powered-by-GEMINI

PusulaAI
PusulaAI, modern yapay zeka ve eğitim teknolojileri ile güçlendirilmiş, YouTube videoları üzerinden kariyer analizleri yapan, öğrenci ve veli raporları sunan ileri seviye bir eğitim destek platformudur.

🚀 Proje Hakkında
PusulaAI, eğitimde kişiselleştirilmiş rehberlik ve kariyer yönlendirmesi sağlayan, yapay zeka destekli inovatif bir platformdur. Kullanıcıların YouTube'dan seçtikleri eğitim videolarını analiz ederek, videoya özel kariyer önerileri, öğrenciye motivasyon ve veliye destek raporları üretir.

Modern teknolojilerle geliştirilmiş tam kapsamlı bir sistem mimarisine sahiptir. Eğitim süreçlerini dijitalleştirirken, Türkiye’nin eğitim ve iş piyasası dinamiklerine uygun, kullanıcı dostu çözümler sunar.

🎯 Özellikler
YouTube Video Analizi: Videodan otomatik olarak Türkçe/İngilizce altyazı çıkarımı ve içerik analizi.

Gemini AI Entegrasyonu: Google Gemini yapay zeka modeli ile derinlemesine metin analizi ve yapılandırılmış veri çıkartma.

Gerçek Zamanlı Takip: WebSocket ile anlık analiz ilerleme durumu izleme.

Çift Raporlama Sistemi: Öğrenciler için motivasyonel, veliler için destekleyici raporlar.

Kariyer ve Eğitim Önerileri: BTK Academy kurs entegrasyonu ve kariyer eşleştirmeleri.

Modern Frontend: React + TypeScript, TanStack Query, Tailwind CSS ile kullanıcı dostu arayüz.

Güçlü Backend: Node.js + Express, PostgreSQL + Drizzle ORM, servis odaklı mimari.

🏗️ Sistem Mimarisi
Katman	Teknolojiler	Açıklama
Frontend	React, TypeScript, Tailwind	Component tabanlı, responsive tasarım
Backend	Node.js, Express, Drizzle	REST API + WebSocket, type-safe ORM
Veritabanı	PostgreSQL (Neon serverless)	Kalıcı veri depolama, session yönetimi
AI Entegrasyonu	Google Gemini AI	Yapay zeka destekli analiz ve raporlama
Dış Entegrasyonlar	YouTube API, BTK Academy	Video verisi ve eğitim içerik entegrasyonu

⚙️ Kurulum ve Çalıştırma
Gereksinimler
Node.js v18+

PostgreSQL (Neon serverless veya lokal)

API anahtarları (YouTube, Gemini AI, BTK Academy)

Adımlar
bash
Kopyala
Düzenle
git clone https://github.com/kullaniciAdi/pusulaai.git
cd pusulaai

# Backend bağımlılıkları
cd server
npm install
npm run migrate # Veritabanı şemalarını oluştur
npm run start

# Frontend bağımlılıkları
cd ../client
npm install
npm run dev
Ortam Değişkenleri (.env)
ini
Kopyala
Düzenle
YOUTUBE_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
BTK_API_KEY=your_btk_api_key
DATABASE_URL=postgres://user:password@host:port/dbname

📚 Kullanım
Ana sayfada YouTube video URL'sini girin.

Sistem videoyu doğrular, transcript çıkarır ve analiz eder.

Analiz ilerlemesini gerçek zamanlı olarak takip edin.

İşlem tamamlandığında öğrenci ve veli raporlarını görüntüleyin.

İlgili kariyer ve kurs önerilerine göz atın.



📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

💬 İletişim
Sorularınız için:

E-posta:cerenconol@gmail.com

Teşekkürler
Bu proje BTK Akademi & Google & Girişimcilik Vakfı Hackhaton 2025 için ve açık kaynak topluluğunun katkılarıyla geliştirilmiştir.
