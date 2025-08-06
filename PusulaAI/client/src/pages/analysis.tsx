import { useParams, useLocation } from "wouter";
import { useEffect } from "react";
import ProgressTracker from "@/components/progress-tracker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { useAnalysis } from "@/hooks/use-analysis";
import { Link } from "wouter";

export default function Analysis() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();
  
  const { data: response, isLoading, error } = useAnalysis(sessionId!);
  const session = (response as any)?.session || response;

  useEffect(() => {
    if (session?.status === "completed") {
      // Redirect to reports when analysis is complete
      setTimeout(() => {
        setLocation(`/reports/${sessionId}`);
      }, 3000);
    }
  }, [session?.status, sessionId, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Analiz bilgileri yükleniyor...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Bir Hata Oluştu</h2>
            <p className="text-text-secondary mb-4">Analiz bilgileri yüklenemedi.</p>
            <Link href="/">
              <Button>
                <Home className="mr-2 w-4 h-4" />Ana Sayfaya Dön
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-text-primary mb-2">Analiz Bulunamadı</h2>
            <p className="text-text-secondary mb-4">Bu analiz oturumu mevcut değil.</p>
            <Link href="/">
              <Button>
                <Home className="mr-2 w-4 h-4" />Ana Sayfaya Dön
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Compass className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">PusulaAI</h1>
                <p className="text-xs text-text-secondary">Analiz İşleniyor</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 w-4 h-4" />Ana Sayfa
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            Video Analiziniz İşleniyor
          </h2>
          <p className="text-xl text-text-secondary">
            Gemini AI ile kariyer bağlantıları keşfediliyor...
          </p>
          {session.videoTitle && (
            <Card className="mt-4 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-text-secondary mb-1">Analiz Edilen Video:</p>
                <h3 className="font-semibold text-text-primary">{session.videoTitle}</h3>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Tracker */}
        <ProgressTracker sessionId={sessionId!} />

        {/* Analysis completed message */}
        {session.status === "completed" && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Analiz Tamamlandı!
              </h3>
              <p className="text-text-secondary mb-4">
                Kariyer raporlarınız hazır. Yönlendiriliyor...
              </p>
              <div className="animate-pulse">
                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error state */}
        {session.status === "failed" && (
          <Card className="mt-8 bg-red-50 border-red-200">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4 text-red-500">⚠️</div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Analiz Başarısız
              </h3>
              <p className="text-text-secondary mb-4">
                Bir hata oluştu. Lütfen tekrar deneyiniz.
              </p>
              <Link href="/">
                <Button>
                  <Home className="mr-2 w-4 h-4" />Ana Sayfaya Dön
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
