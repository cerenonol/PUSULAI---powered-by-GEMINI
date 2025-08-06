import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorksSection from "@/components/how-it-works-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Network, 
  GraduationCap, 
  School, 
  Users, 
  MemoryStick,
  Heart,
  University,
  Download,
  Info,
  Rocket,
  Twitter,
  Linkedin,
  Github,
  Compass
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Compass className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">PusulaAI</h1>
                <p className="text-xs text-text-secondary">Eğitimde Gerçek Hayat Bağlantısı</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-primary transition-colors font-medium">Özellikler</a>
              <a href="#how-it-works" className="text-text-secondary hover:text-primary transition-colors font-medium">Nasıl Çalışır</a>
              <a href="#contact" className="text-text-secondary hover:text-primary transition-colors font-medium">İletişim</a>
              <Button className="bg-primary text-white hover:bg-blue-700 transition-all font-medium">
                Başla
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Sample Reports Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Örnek Raporlar</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              PusulaAI'nin ürettiği raporların örneklerini incele
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Report Preview */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <School className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">Öğrenci Raporu</h3>
                </div>
                
                <Card className="bg-white shadow-inner mb-6">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-text-primary mb-3">Video Konusu: Yeryüzündeki Su Kaynakları</h4>
                    <div className="space-y-3 text-sm text-text-secondary">
                      <div><strong>Ana Konular:</strong> Hidrolojik döngü, yeraltı suları, buzullar</div>
                      <div><strong>Kariyer Alanları:</strong> Hidrolog, CBS Uzmanı, İklim Analisti</div>
                      <div><strong>Türkiye İş Pazarı:</strong> <Badge className="bg-success text-white">Yüksek talep</Badge></div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                        <GraduationCap className="mr-2 w-4 h-4 text-primary" />BTK Kurs Önerileri:
                      </h5>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>• Veri Bilimi için Python</li>
                        <li>• Coğrafi Bilgi Sistemleri</li>
                        <li>• İklim Veri Analizi</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                        <Network className="mr-2 w-4 h-4 text-accent" />Kariyer Yol Haritası:
                      </h5>
                      <div className="text-sm text-text-secondary">
                        Lise → Çevre/Jeoloji Mühendisliği → CBS Sertifikası → Staj (DSİ) → Kariyer
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Parent Report Preview */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <Users className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">Veli Rehberi</h3>
                </div>
                
                <Card className="bg-white shadow-inner mb-6">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-text-primary mb-3">Çocuğunuzun İlgi Alanı: Su Kaynakları</h4>
                    <p className="text-sm text-text-secondary">
                      Çocuğunuz çevre ve doğa konularında güçlü bir ilgi gösteriyor. 
                      Bu alanda Türkiye'de yüksek iş imkanı bulunmaktadır.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                        <Heart className="mr-2 w-4 h-4 text-pink-500" />Nasıl Destekleyebilirsiniz:
                      </h5>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>• Doğa yürüyüşleri ve gözlemler yapın</li>
                        <li>• Bilim müzelerini ziyaret edin</li>
                        <li>• Online kursları birlikte takip edin</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                        <University className="mr-2 w-4 h-4 text-secondary" />Üniversite Bölümleri:
                      </h5>
                      <div className="text-sm text-text-secondary">
                        Çevre Mühendisliği, Jeoloji Mühendisliği, Coğrafya, Meteoroloji Mühendisliği
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
              <Download className="mr-2 w-5 h-5" />Tam Raporları İncele
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Eğitimde yönünü kaybedenlerden olma
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Akademik bilgilerini gerçek kariyer fırsatlarına dönüştürmeye bugün başla. 
            Geleceğin mesleklerinde yerini al.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-white text-primary px-8 py-4 text-lg font-bold hover:shadow-lg transition-all transform hover:scale-105">
              <Rocket className="mr-2 w-5 h-5" />Hemen Başla
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-bold hover:bg-white hover:text-primary transition-all">
              <Info className="mr-2 w-5 h-5" />Daha Fazla Bilgi
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">2-3dk</div>
                <div className="text-sm opacity-80">Ortalama analiz süresi</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-80">Farklı kariyer alanı</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">BTK</div>
                <div className="text-sm opacity-80">Akademi entegrasyonu</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                  <Compass className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">PusulaAI</h3>
                  <p className="text-gray-400 text-sm">Eğitimde Gerçek Hayat Bağlantısı</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Akademik öğrenmelerinizi gerçek kariyer fırsatlarıyla buluşturan 
                AI destekli eğitim platformu. Gemini AI teknolojisi ile 
                geleceğinizi şekillendirin.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-primary hover:bg-blue-700">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-primary hover:bg-blue-700">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-primary hover:bg-blue-700">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-primary transition-colors">Özellikler</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">Nasıl Çalışır</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Fiyatlandırma</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-primary transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gizlilik</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PusulaAI. Tüm hakları saklıdır. BTK Akademi ile entegreli.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
