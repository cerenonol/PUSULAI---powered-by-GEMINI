import { useParams } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReportViewer from "@/components/report-viewer";
import { 
  Compass, 
  ArrowLeft, 
  Download, 
  Share2,
  School,
  Users,
  GraduationCap,
  Network,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  Building,
  Heart,
  University
} from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface AnalysisResults {
  videoTitle: string;
  geminiAnalysis: any;
  careerMatches: any[];
  btkRecommendations: any[];
  studentReport: any;
  parentReport: any;
  completedAt: string;
}

export default function Reports() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [activeTab, setActiveTab] = useState("student");

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["/api/analysis", sessionId, "results"],
    enabled: !!sessionId,
  });

  const results = (response as any)?.results;
  
  // Parse JSON strings if needed
  const geminiAnalysis = results?.geminiAnalysis ? 
    (typeof results.geminiAnalysis === 'string' ? JSON.parse(results.geminiAnalysis) : results.geminiAnalysis) : null;
  
  const careerMatches = results?.careerMatches ? 
    (typeof results.careerMatches === 'string' ? JSON.parse(results.careerMatches) : results.careerMatches) : [];
    
  const studentReport = results?.studentReport ? 
    (typeof results.studentReport === 'string' ? JSON.parse(results.studentReport) : results.studentReport) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Raporlar yükleniyor...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Raporlar Bulunamadı</h2>
            <p className="text-text-secondary mb-4">Bu analiz için raporlar henüz hazır değil.</p>
            <Link href="/">
              <Button>Ana Sayfaya Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Compass className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">PusulaAI</h1>
                <p className="text-xs text-text-secondary">Kariyer Raporları</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 w-4 h-4" />Paylaş
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 w-4 h-4" />İndir
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 w-4 h-4" />Ana Sayfa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Info */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {results.videoTitle}
                </h2>
                <p className="text-text-secondary">
                  Analiz Tamamlandı: {results?.completedAt ? new Date(results.completedAt).toLocaleString("tr-TR") : "Bilinmiyor"}
                </p>
              </div>
              <Badge className="bg-success text-white">Tamamlandı</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-text-primary">
                {geminiAnalysis?.mainTopics?.length || 0}
              </div>
              <div className="text-sm text-text-secondary">Ana Konu</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-text-primary">
                {careerMatches?.length || 0}
              </div>
              <div className="text-sm text-text-secondary">Kariyer Önerisi</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-text-primary">
                {results.btkRecommendations?.length || 0}
              </div>
              <div className="text-sm text-text-secondary">BTK Kursu</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-100 to-orange-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-text-primary">
                {geminiAnalysis?.turkeyJobMarketFit || "Belirleniyor"}
              </div>
              <div className="text-sm text-text-secondary">İş Pazarı Uyumu</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="student" className="flex items-center space-x-2">
              <School className="w-4 h-4" />
              <span>Öğrenci Raporu</span>
            </TabsTrigger>
            <TabsTrigger value="parent" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Veli Rehberi</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <School className="text-white w-5 h-5" />
                  </div>
                  <span>Kişiselleştirilmiş Kariyer Rehberin</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Topics */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                    <BookOpen className="mr-2 w-5 h-5" />Tespit Edilen Ana Konular
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {geminiAnalysis?.mainTopics?.map((topic: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {topic}
                      </Badge>
                    )) || <p className="text-text-secondary">Konular yükleniyor...</p>}
                  </div>
                </div>

                <Separator />

                {/* Career Matches */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                    <Target className="mr-2 w-5 h-5" />Önerilen Kariyer Alanları
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerMatches?.slice(0, 4).map((career: any, index: number) => (
                      <Card key={index} className="bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-text-primary">{career.career}</h4>
                            <Badge className="bg-primary text-white text-xs">
                              %{career.matchScore}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary mb-3">{career.reasoning}</p>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs font-medium text-text-primary">Gerekli Beceriler:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {career.requiredSkills?.slice(0, 3).map((skill: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-text-primary">Örnek Şirketler:</span>
                              <p className="text-xs text-text-secondary">
                                {career.companies?.slice(0, 2).join(", ")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* BTK Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                    <GraduationCap className="mr-2 w-5 h-5" />İlgini Çekebilecek BTK Kursları
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.btkRecommendations?.map((course: any, index: number) => (
                      <Card key={index} className="bg-white">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-text-primary mb-2">{course.title}</h4>
                          <p className="text-sm text-text-secondary mb-3">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-text-secondary" />
                              <span className="text-xs text-text-secondary">{course.duration}</span>
                            </div>
                            <Badge variant="outline">{course.level}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Student Report Content */}
                <ReportViewer report={results.studentReport} type="student" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parent" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="text-white w-5 h-5" />
                  </div>
                  <span>Veli Destek Kılavuzu</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Child's Interests */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                    <Heart className="mr-2 w-5 h-5 text-pink-500" />Çocuğunuzun İlgi Alanları
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.parentReport?.childInterests?.map((interest: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* University Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                    <University className="mr-2 w-5 h-5" />Üniversite Bölüm Önerileri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-text-primary mb-2">Mühendislik Alanları</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• Çevre Mühendisliği</li>
                          <li>• Jeoloji Mühendisliği</li>
                          <li>• Harita Mühendisliği</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-text-primary mb-2">Fen Bilimleri</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          <li>• Coğrafya</li>
                          <li>• Meteoroloji</li>
                          <li>• Jeofizik</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Support Suggestions */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                    <Building className="mr-2 w-5 h-5" />Nasıl Destekleyebilirsiniz
                  </h3>
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-text-primary mb-3">Pratik Aktiviteler</h4>
                          <ul className="text-sm text-text-secondary space-y-2">
                            <li>• Doğa yürüyüşleri ve gözlemler yapın</li>
                            <li>• Bilim müzelerini ziyaret edin</li>
                            <li>• Online kursları birlikte takip edin</li>
                            <li>• Su tasarrufu projeleri geliştirin</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary mb-3">Eğitim Desteği</h4>
                          <ul className="text-sm text-text-secondary space-y-2">
                            <li>• STEM kulüplerine katılımı destekleyin</li>
                            <li>• Bilim yarışmalarına teşvik edin</li>
                            <li>• Uzmanlarla buluşma fırsatları yaratın</li>
                            <li>• Kitap ve dergi okuma alışkanlığı kazandırın</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Parent Report Content */}
                <ReportViewer report={results.parentReport} type="parent" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3">
            <Download className="mr-2 w-5 h-5" />Raporları İndir
          </Button>
          <Button variant="outline" className="px-8 py-3">
            <Share2 className="mr-2 w-5 h-5" />Paylaş
          </Button>
          <Link href="/">
            <Button variant="outline" className="px-8 py-3">
              <Compass className="mr-2 w-5 h-5" />Yeni Analiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
