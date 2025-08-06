# PUSULAI---powered-by-GEMINI
PusulaAI
Proje Tanımı
PusulaAI, eğitim teknolojileri alanında yapay zekâ destekli inovatif bir platformdur. YouTube üzerindeki eğitim içeriklerini analiz ederek öğrencilerin kariyer yönelimlerine uygun kişiselleştirilmiş öneriler sunar. Öğrenciler için motivasyonel ve geleceğe yönelik, veliler için ise destekleyici raporlar üretir. Platform, Türkiye eğitim sistemi ve iş piyasasının dinamiklerine entegre edilerek, gerçek zamanlı veri işleme ve gelişmiş yapay zekâ modelleri ile çalışmaktadır.

Sistem Mimarisi ve Teknolojiler
PusulaAI, modern full-stack JavaScript teknolojileriyle geliştirilmiş, servis odaklı mimarisi sayesinde ölçeklenebilir ve esnek bir yapıya sahiptir.

Frontend: React ve TypeScript kullanılarak geliştirilen, Tailwind CSS ile responsive ve kullanıcı dostu arayüz tasarımı. TanStack Query ile API çağrılarında akıllı önbellekleme ve veri yönetimi sağlanır.

Backend: Node.js ve Express çatısı altında servis odaklı mimari uygulanmıştır. Drizzle ORM ile PostgreSQL veritabanı işlemleri tip güvenli biçimde yönetilir. Gerçek zamanlı iletişim WebSocket protokolü ile sağlanır.

Veritabanı: Neon serverless PostgreSQL ile yüksek erişilebilirlik ve ölçeklenebilirlik.

Yapay Zekâ Entegrasyonu: Google Gemini AI (2.5-flash modeli) kullanılarak videolardan çıkarılan transcriptlerin anlamlandırılması ve yapılandırılmış analiz sonuçları üretilir.

Dış Sistem Entegrasyonları: YouTube Data API v3 ve YouTube Transcript API üzerinden video bilgisi ve altyazı verileri alınır. Ayrıca BTK Academy kurslarıyla eğitim önerileri entegre edilmiştir.

Çalışma Prensibi ve Analiz Süreci
URL Doğrulama ve Video Bilgisi Çekme: Kullanıcıdan alınan YouTube video URL'si regex ile doğrulanır, video kimliği çıkarılır. YouTube API üzerinden video meta verileri alınır ve analiz oturumu oluşturulur.

Transcript Çıkarımı: Öncelikli olarak Türkçe transcript alınmaya çalışılır. Eğer mevcut değilse İngilizce transcript elde edilir. Transcript, sistemde parça parça işlenerek veritabanında optimize edilmiş şekilde depolanır.

Gemini AI Analizi: Transcript parçaları, token limitlerine dikkat edilerek Google Gemini AI modeline gönderilir. Modelden gelen yapılandırılmış analiz çıktıları JSON formatında veritabanına kaydedilir.

Gerçek Zamanlı İlerleme Takibi: WebSocket ile kullanıcıya analiz süreci boyunca anlık güncellemeler sağlanır. Sunucu sadece ilgili oturuma bağlı istemcilere veri gönderir.

Raporlama: AI tarafından oluşturulan analiz sonuçları kullanılarak öğrenci ve veli raporları hazırlanır. Öğrenci raporu motivasyon ve kariyer odaklıdır; veli raporu ise eğitim sürecine destek olacak bilgiler içerir.

Kariyer ve Eğitim Önerileri: BTK Academy ile entegrasyon sayesinde, öğrencilerin gelişimine uygun kurslar önerilir. Ayrıca analiz sonuçlarına göre beş farklı kariyer yolu önerisi sunulur.

Mevcut Durum ve Sorunlar
Sistem genel olarak başarılı çalışmakta, analizler tamamlanmakta ve veritabanına eksiksiz kayıt yapılmaktadır. Ancak bazı durumlarda frontend tarafında raporların kullanıcıya doğru şekilde yansıtılmaması nedeniyle görüntüleme sorunları yaşanmaktadır. Bu, veri akışında ya da frontend state yönetiminde ele alınması gereken bir problemdir.

Kurulum ve Çalıştırma Talimatları
Gereksinimler
Node.js (v18 ve üzeri)

PostgreSQL (Neon serverless önerilir)

YouTube API Anahtarı

Gemini AI API Anahtarı

BTK Academy API Anahtarı

Kurulum
Proje klonlanır:

bash
Kopyala
Düzenle
git clone https://github.com/your-repo/pusulaai.git
cd pusulaai
Backend kurulumu:

arduino
Kopyala
Düzenle
cd server
npm install
npm run migrate
npm run start
Frontend kurulumu:

bash
Kopyala
Düzenle
cd ../client
npm install
npm run dev
Ortam değişkenleri .env dosyasına tanımlanır:

ini
Kopyala
Düzenle
YOUTUBE_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
BTK_API_KEY=your_btk_api_key
DATABASE_URL=postgres://user:password@host:port/dbname
Katkıda Bulunma Rehberi
PusulaAI, eğitim teknolojileri alanında fark yaratmak isteyen geliştiriciler ve araştırmacılar için açık kaynaklıdır. Projeye katkı sağlamak için:

Projeyi fork edin ve yeni bir branch oluşturun.

Yeni özellikler ekleyin, mevcut hataları düzeltin veya dokümantasyon geliştirin.

Kodun okunabilirliğine, testlere ve kod standartlarına özen gösterin.

Detaylı açıklamalarla Pull Request açın.


Lisans
PusulaAI, MIT Lisansı ile lisanslanmıştır. Lisans metni LICENSE dosyasında bulunmaktadır.

💬 İletişim
Sorularınız için:

E-posta:cerenconol@gmail.com

Teşekkürler
Bu proje BTK Akademi & Google & Girişimcilik Vakfı Hackhaton 2025 için ve açık kaynak topluluğunun katkılarıyla geliştirilmiştir.
