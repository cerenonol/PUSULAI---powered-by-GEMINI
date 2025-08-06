import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Users, 
  Heart,
  University,
  Building,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Clock,
  Download,
  Share2
} from "lucide-react";

interface ReportViewerProps {
  report: any;
  type: 'student' | 'parent';
}

export default function ReportViewer({ report, type }: ReportViewerProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  if (!report || !report.content) {
    return (
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Rapor Hazırlanıyor
          </h3>
          <p className="text-text-secondary">
            {type === 'student' ? 'Öğrenci raporu' : 'Veli rehberi'} henüz hazır değil...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (type === 'student') {
    return (
      <div className="space-y-6">
        {/* Report Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Kişisel Kariyer Rehberin
                </h3>
                <p className="opacity-90">
                  Video: {report.videoTopic}
                </p>
              </div>
              <div className="text-right">
                <Trophy className="w-12 h-12 opacity-80 mb-2" />
                <p className="text-sm opacity-80">
                  AI Destekli Analiz
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Topics */}
        {report.mainTopics && (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 w-5 h-5 text-blue-500" />
                Tespit Edilen Ana Konular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {report.mainTopics.map((topic: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Career Areas */}
        {report.careerAreas && (
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 w-5 h-5 text-green-500" />
                Önerilen Kariyer Alanları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.careerAreas.map((career: any, index: number) => (
                <Card key={index} className="bg-gray-50 hover:bg-white transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-text-primary text-lg">
                        {career.career}
                      </h4>
                      <Badge className="bg-green-500 text-white">
                        %{career.matchScore} uyum
                      </Badge>
                    </div>
                    <p className="text-text-secondary mb-3">
                      {career.reasoning}
                    </p>
                    
                    {career.requiredSkills && (
                      <div className="space-y-2">
                        <h5 className="font-semibold text-text-primary flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          Gerekli Beceriler:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {career.requiredSkills.map((skill: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {career.companies && (
                      <div className="mt-3 pt-3 border-t">
                        <h5 className="font-semibold text-text-primary flex items-center text-sm">
                          <Building className="w-4 h-4 mr-1 text-blue-500" />
                          Örnek Şirketler:
                        </h5>
                        <p className="text-sm text-text-secondary">
                          {career.companies.join(", ")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recommended Courses */}
        {report.recommendedCourses && (
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 w-5 h-5 text-purple-500" />
                BTK Akademi Kurs Önerileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.recommendedCourses.map((course: any, index: number) => (
                <Card key={index} className="bg-purple-50 hover:bg-white transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-text-primary">
                        {course.title}
                      </h4>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-text-secondary">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      {course.url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={course.url} target="_blank" rel="noopener noreferrer">
                            Kursa Git <ArrowRight className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Detailed Content */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 w-5 h-5 text-orange-500" />
              Detaylı Kariyer Rehberi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded border p-4 bg-gray-50">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
                  {report.content}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parent Report
  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Veli Destek Kılavuzu
              </h3>
              <p className="opacity-90">
                Çocuğunuzun kariyer gelişimi için rehber
              </p>
            </div>
            <div className="text-right">
              <Users className="w-12 h-12 opacity-80 mb-2" />
              <p className="text-sm opacity-80">
                Aile Desteği
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Child's Interests */}
      {report.childInterests && (
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 w-5 h-5 text-pink-500" />
              Çocuğunuzun İlgi Alanları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {report.childInterests.map((interest: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-800 px-3 py-1">
                  <Heart className="w-3 h-3 mr-1" />
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Suggestions */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 w-5 h-5 text-blue-500" />
            Destek Önerileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <Building className="mr-2 w-4 h-4" />
                Pratik Aktiviteler
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Doğa yürüyüşleri ve gözlemler yapın
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Bilim müzelerini ziyaret edin
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Online kursları birlikte takip edin
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <University className="mr-2 w-4 h-4" />
                Eğitim Desteği
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  STEM kulüplerine katılımı destekleyin
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Bilim yarışmalarına teşvik edin
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  Kitap okuma alışkanlığı kazandırın
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Parent Guide */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 w-5 h-5 text-green-500" />
            Detaylı Veli Rehberi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full rounded border p-4 bg-gray-50">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
                {report.content}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <TrendingUp className="mr-2 w-5 h-5" />
            Hemen Yapabilecekleriniz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-text-primary mb-2">Bu Hafta</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Çocuğunuzla ilgi alanlarını konuşun</li>
                <li>• BTK Akademi kurslarına göz atın</li>
                <li>• Yerel bilim merkezlerini araştırın</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-text-primary mb-2">Bu Ay</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Önerilen üniversite bölümlerini inceleyin</li>
                <li>• Sektör uzmanları ile buluşma ayarlayın</li>
                <li>• Proje tabanlı aktiviteler planlayın</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
