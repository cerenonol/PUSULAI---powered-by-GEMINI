import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useWebSocket } from "@/hooks/use-websocket";
import { useQuery } from "@tanstack/react-query";
import { 
  Link as LinkIcon, 
  FileText, 
  Brain, 
  Network, 
  GraduationCap, 
  University, 
  Users,
  Check,
  Clock,
  AlertCircle,
  Zap
} from "lucide-react";

interface ProgressStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const progressSteps: ProgressStep[] = [
  {
    id: 1,
    title: "Linki aldık",
    description: "YouTube bağlantısı sisteme başarıyla alındı",
    icon: LinkIcon,
    status: 'pending'
  },
  {
    id: 2,
    title: "Transkript çıkarılıyor",
    description: "Video içeriği metne dönüştürülüyor...",
    icon: FileText,
    status: 'pending'
  },
  {
    id: 3,
    title: "Gemini analizi yapılıyor",
    description: "AI konuları ve kariyer bağlantılarını analiz ediyor",
    icon: Brain,
    status: 'pending'
  },
  {
    id: 4,
    title: "Kariyer eşleştirmesi",
    description: "Konular meslek alanlarıyla ilişkilendiriliyor",
    icon: Network,
    status: 'pending'
  },
  {
    id: 5,
    title: "BTK önerileri hazırlanıyor",
    description: "İlgini çekebilecek kurslar aranıyor",
    icon: GraduationCap,
    status: 'pending'
  },
  {
    id: 6,
    title: "Öğrenci raporu oluşturuluyor",
    description: "Sana özel kariyer rehberi hazırlanıyor",
    icon: University,
    status: 'pending'
  },
  {
    id: 7,
    title: "Veli raporu oluşturuluyor",
    description: "Aileler için destek kılavuzu oluşturuluyor",
    icon: Users,
    status: 'pending'
  }
];

interface ProgressTrackerProps {
  sessionId: string;
}

export default function ProgressTracker({ sessionId }: ProgressTrackerProps) {
  const [steps, setSteps] = useState<ProgressStep[]>(progressSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // WebSocket connection for real-time updates
  const { lastMessage, connectionStatus, sendMessage } = useWebSocket(`/ws`);

  // Query for current progress state
  const { data: progressData } = useQuery({
    queryKey: ['/api/analysis', sessionId, 'progress'],
    refetchInterval: 2000, // Fallback polling every 2 seconds
    enabled: !!sessionId
  });

  // Handle WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.data);
        
        if (message.type === 'progress' && message.data.sessionId === sessionId) {
          const { step, details } = message.data;
          
          setSteps(prevSteps => 
            prevSteps.map((stepItem, index) => {
              if (index + 1 === step) {
                return {
                  ...stepItem,
                  status: details?.status || 'processing'
                };
              } else if (index + 1 < step) {
                return {
                  ...stepItem,
                  status: 'completed'
                };
              }
              return stepItem;
            })
          );
          
          setCurrentStep(step);
          
          if (details?.analysisComplete) {
            setIsComplete(true);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage, sessionId]);

  // Subscribe to session updates when connected
  useEffect(() => {
    if (connectionStatus === 'Connected' && sendMessage) {
      sendMessage({
        type: 'subscribe',
        sessionId: sessionId
      });
    }
  }, [connectionStatus, sendMessage, sessionId]);

  // Handle polling data
  useEffect(() => {
    if (progressData && typeof progressData === 'object' && 'progress' in progressData && (progressData as any).progress) {
      const latestProgress = (progressData as any).progress[0];
      if (latestProgress) {
        setCurrentStep(latestProgress.step);
        
        // Update steps based on latest progress
        setSteps(prevSteps =>
          prevSteps.map((step, index) => {
            if (index + 1 <= latestProgress.step) {
              return {
                ...step,
                status: index + 1 === latestProgress.step ? 
                  (latestProgress.details?.status || 'processing') : 
                  'completed'
              };
            }
            return step;
          })
        );
      }
    }
  }, [progressData]);

  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    return (completedSteps / steps.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-white" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-white" />;
      default:
        return <Clock className="w-5 h-5 text-white opacity-60" />;
    }
  };

  const getStepStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 shadow-green-100';
      case 'processing':
        return 'bg-blue-50 border-blue-200 shadow-blue-100 animate-pulse';
      case 'error':
        return 'bg-red-50 border-red-200 shadow-red-100';
      default:
        return 'bg-gray-50 border-gray-200 opacity-60';
    }
  };

  const getIconStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'processing':
        return 'bg-primary animate-pulse';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 animate-pulse-slow">
              <Brain className="text-white w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Gemini AI Analiz Yapıyor
            </h3>
            <p className="text-text-secondary">
              Videodaki içeriği kariyer fırsatlarıyla eşleştiriyoruz
            </p>
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Zap className="w-4 h-4 text-warning" />
              <Badge variant="secondary" className="bg-white/80">
                WebSocket {connectionStatus === 'Connected' ? '🟢' : '🔴'}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">
                İlerleme: {Math.round(calculateProgress())}%
              </span>
              <span className="text-sm text-text-secondary">
                {currentStep}/{steps.length} adım
              </span>
            </div>
            <Progress 
              value={calculateProgress()} 
              className="h-3 bg-gray-200"
            />
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="text-4xl mb-2">🎉</div>
              <h4 className="text-lg font-bold text-text-primary">
                Analiz Tamamlandı!
              </h4>
              <p className="text-text-secondary">
                Raporlarınız hazır, yönlendiriliyor...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`transition-all duration-500 transform hover:scale-102 ${getStepStyle(step.status)} shadow-lg`}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-12 h-12 ${getIconStyle(step.status)} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-grow">
                  <h4 className="font-semibold text-text-primary text-lg mb-1">
                    {step.title}
                  </h4>
                  <p className="text-text-secondary">
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0 ml-4">
                  {step.status === 'completed' && (
                    <Badge className="bg-success text-white">
                      <Check className="w-3 h-3 mr-1" />
                      Tamamlandı
                    </Badge>
                  )}
                  {step.status === 'processing' && (
                    <Badge className="bg-primary text-white animate-pulse">
                      <Clock className="w-3 h-3 mr-1" />
                      İşleniyor...
                    </Badge>
                  )}
                  {step.status === 'error' && (
                    <Badge className="bg-red-500 text-white">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Hata
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Estimate */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-blue-800 font-medium">
            Ortalama analiz süresi: 2-3 dakika
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
