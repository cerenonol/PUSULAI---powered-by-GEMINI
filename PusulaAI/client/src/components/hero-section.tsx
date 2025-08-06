import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Rocket, Youtube, Brain, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const startAnalysisMutation = useMutation({
    mutationFn: async (youtubeUrl: string) => {
      const response = await apiRequest("POST", "/api/analysis/start", { youtubeUrl });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Analiz Başlatıldı! 🚀",
        description: "Gemini AI videonuzu işlemeye başladı",
      });
      setLocation(`/analysis/${data.sessionId}`);
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Analiz başlatılamadı",
        variant: "destructive",
      });
    },
  });

  const validateYouTubeURL = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return regex.test(url);
  };

  const handleStartAnalysis = () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "URL Gerekli",
        description: "Lütfen bir YouTube video linki girin",
        variant: "destructive",
      });
      return;
    }

    if (!validateYouTubeURL(youtubeUrl)) {
      toast({
        title: "Geçersiz URL",
        description: "Lütfen geçerli bir YouTube video linki girin",
        variant: "destructive",
      });
      return;
    }

    startAnalysisMutation.mutate(youtubeUrl);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Hero Title */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
            <h2 className="relative text-4xl md:text-6xl font-bold text-text-primary leading-tight">
              <span className="text-primary">Öğrendiklerim</span> gerçek hayatta<br/>
              <span className="text-secondary">ne işe yarayacak ki?</span>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-warning animate-pulse" />
              </div>
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
            diye sorguluyorsan cevabı bulmak için <span className="font-semibold text-accent">doğru yerdesin.</span><br/>
            AI destekli kariyer rehberimizle akademik içerikleri gerçek meslek alanlarıyla eşleştiriyoruz.
          </p>

          {/* Analysis Input Card */}
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Brain className="w-8 h-8 text-primary animate-pulse" />
                  <h3 className="text-2xl font-bold text-text-primary">
                    Gemini AI ile Analiz Et
                  </h3>
                  <Zap className="w-8 h-8 text-warning animate-bounce" />
                </div>

                {/* URL Input */}
                <div className="space-y-3">
                  <Label htmlFor="youtube-url" className="text-left text-base font-semibold text-text-primary flex items-center">
                    <Youtube className="mr-2 w-5 h-5 text-red-500" />
                    YouTube Video Linki
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-primary transition-all"
                    disabled={startAnalysisMutation.isPending}
                  />
                </div>

                {/* Start Button */}
                <Button
                  onClick={handleStartAnalysis}
                  disabled={startAnalysisMutation.isPending}
                  className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:transform-none"
                >
                  {startAnalysisMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Başlatılıyor...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Rocket className="w-5 h-5" />
                      <span>Gemini AI ile Analizi Başlat</span>
                    </div>
                  )}
                </Button>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-text-primary">Gemini AI Analizi</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Rocket className="w-5 h-5 text-secondary" />
                    </div>
                    <p className="text-sm font-medium text-text-primary">Hızlı İşlem</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-sm font-medium text-text-primary">Detaylı Rapor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2-3dk</div>
                <div className="text-text-secondary">Ortalama analiz süresi</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-text-secondary">Farklı kariyer alanı</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">BTK</div>
                <div className="text-text-secondary">Akademi entegrasyonu</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
