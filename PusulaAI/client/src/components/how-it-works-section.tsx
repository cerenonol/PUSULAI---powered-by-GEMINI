import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Youtube, 
  Brain, 
  Network, 
  FileText, 
  ArrowRight,
  Clock,
  Zap,
  Target,
  Sparkles
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "YouTube Linki Gir",
    description: "Merak ettiğin eğitim videosunun linkini yapıştır. Sistemimiz otomatik olarak video içeriğini analiz etmeye başlar.",
    icon: Youtube,
    gradient: "from-red-400 to-red-600",
    bgGradient: "from-red-50 to-red-100"
  },
  {
    number: 2,
    title: "Gemini AI Analizi",
    description: "Gemini AI video transkriptini analiz ederek konuları belirler ve gerçek hayat kariyer bağlantılarını keşfeder.",
    icon: Brain,
    gradient: "from-purple-400 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100"
  },
  {
    number: 3,
    title: "Kariyer Eşleştirme",
    description: "Belirlenen konular meslek veritabanımızla eşleştirilerek potansiyel kariyer yolları belirlenir.",
    icon: Network,
    gradient: "from-green-400 to-green-600",
    bgGradient: "from-green-50 to-green-100"
  },
  {
    number: 4,
    title: "Detaylı Rapor",
    description: "Hem öğrenci hem de veli için hazırlanmış detaylı kariyer rehberi ve BTK kurs önerileri ile tamamlanmış rapor alırsın.",
    icon: FileText,
    gradient: "from-orange-400 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100"
  }
];

const features = [
  {
    icon: Clock,
    title: "2-3 Dakika",
    description: "Hızlı analiz"
  },
  {
    icon: Zap,
    title: "Gerçek Zamanlı",
    description: "Anlık güncellemeler"
  },
  {
    icon: Target,
    title: "Kişiselleştirilmiş",
    description: "Sana özel öneriler"
  },
  {
    icon: Sparkles,
    title: "AI Destekli",
    description: "Gemini teknolojisi"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Target className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-4xl font-bold text-text-primary">Nasıl Çalışır?</h2>
            <Sparkles className="w-8 h-8 text-warning animate-bounce" />
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Basit bir YouTube linki ile başlayan süreç, detaylı kariyer rehberi ile tamamlanır
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mb-16">
          {/* Timeline Line - Hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full hidden lg:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:pl-12' : 'lg:pr-12'} mb-8 lg:mb-0`}>
                  <Card className={`bg-gradient-to-br ${step.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg`}>
                          {step.number}
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary">{step.title}</h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${step.gradient} p-12 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105`}>
                      <step.icon className="text-white w-16 h-16 mx-auto animate-pulse" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <ArrowRight className="w-8 h-8 text-primary animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Öne Çıkan Özellikler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-primary transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-text-primary mb-2">{feature.title}</h4>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-text-primary text-center mb-6">
            7 Aşamalı Analiz Süreci
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Link Alımı",
              "Transcript Çıkarma", 
              "Gemini Analizi",
              "Kariyer Eşleştirme",
              "BTK Önerileri",
              "Öğrenci Raporu",
              "Veli Rehberi"
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <Badge className="bg-white text-text-primary border-2 border-primary/20 px-4 py-2">
                  {index + 1}. {step}
                </Badge>
                {index < 6 && (
                  <ArrowRight className="w-4 h-4 text-primary mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
