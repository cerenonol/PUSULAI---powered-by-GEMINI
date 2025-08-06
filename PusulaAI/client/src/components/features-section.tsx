import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Network, 
  GraduationCap, 
  University, 
  Users, 
  MemoryStick,
  Sparkles,
  Zap,
  Target,
  Rocket,
  BookOpen,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Gemini AI Analizi",
    description: "Google'ın en gelişmiş AI modeliyle video içeriklerini derinlemesine analiz edip kariyer bağlantılarını keşfediyoruz.",
    gradient: "from-blue-50 to-blue-100",
    color: "bg-primary",
    textColor: "text-primary"
  },
  {
    icon: Network,
    title: "Akıllı Eşleştirme",
    description: "Öğrendiğin konuları gerçek meslek alanlarıyla eşleştirerek kariyer yolculuğuna rehberlik ediyoruz.",
    gradient: "from-purple-50 to-purple-100",
    color: "bg-secondary",
    textColor: "text-secondary"
  },
  {
    icon: GraduationCap,
    title: "BTK Akademi Entegrasyonu",
    description: "BTK Akademi'den ilgili kursları otomatik önererek becerilerini geliştirmene yardımcı oluyoruz.",
    gradient: "from-green-50 to-green-100",
    color: "bg-accent",
    textColor: "text-accent"
  },
  {
    icon: University,
    title: "Kişisel Kariyer Raporu",
    description: "Sana özel hazırlanmış detaylı kariyer rehberi ve adım adım gelişim planı alıyorsun.",
    gradient: "from-orange-50 to-orange-100",
    color: "bg-warning",
    textColor: "text-warning"
  },
  {
    icon: Users,
    title: "Veli Destek Kılavuzu",
    description: "Ailelerin çocuklarının kariyer gelişimini desteklemesi için hazırlanmış rehber materyaller.",
    gradient: "from-pink-50 to-pink-100",
    color: "bg-pink-500",
    textColor: "text-pink-500"
  },
  {
    icon: MemoryStick,
    title: "Akıllı Hafıza Sistemi",
    description: "Agent memory ile geçmiş analizlerini hatırlayarak daha kişiselleştirilmiş öneriler sunuyoruz.",
    gradient: "from-indigo-50 to-indigo-100",
    color: "bg-indigo-500",
    textColor: "text-indigo-500"
  }
];

const additionalFeatures = [
  {
    icon: Target,
    title: "7 Aşamalı Analiz",
    description: "Link alımından rapor oluşumuna kadar şeffaf süreç takibi"
  },
  {
    icon: Rocket,
    title: "Gerçek Zamanlı İşlem",
    description: "WebSocket ile anlık progress güncellemeleri"
  },
  {
    icon: BookOpen,
    title: "MEB Uyumlu",
    description: "Türk eğitim sistemine özel kariyer rehberliği"
  },
  {
    icon: TrendingUp,
    title: "Türkiye Odaklı",
    description: "Yerel iş pazarı ve şirket analizleri"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-warning animate-pulse" />
            <h2 className="text-4xl font-bold text-text-primary">Neden PusulaAI?</h2>
            <Zap className="w-8 h-8 text-accent animate-bounce" />
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Gemini AI teknolojisi ile akademik içerikleri gerçek kariyer fırsatlarına dönüştürüyoruz
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0`}
            >
              <CardContent className="p-8">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${feature.textColor} mb-4`}>
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Ek Özellikler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{feature.title}</h4>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            Teknoloji Altyapımız
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Gemini 2.5 Pro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">WebSocket</span>
            </div>
            <div className="flex items-center space-x-2">
              <MemoryStick className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Agent MemoryStick</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium">BTK API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
