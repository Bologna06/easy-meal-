'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChefHat, Check, Star, Clock, Heart, Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';
import KirvanoCheckout from '@/components/KirvanoCheckout';

// URL do checkout Kirvano atualizada
const KIRVANO_CHECKOUT_URL = 'https://pay.kirvano.com/eb308bf0-e9a3-49d9-99e0-fa545d14f2b1';

export default function OfertaPage() {
  const [quizData, setQuizData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');

  useEffect(() => {
    setMounted(true);
    
    // Carregar respostas do quiz
    const answers = localStorage.getItem('quizAnswers');
    if (answers) {
      setQuizData(JSON.parse(answers));
    }

    // Carregar email se existir
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }

    // Definir vagas restantes apenas no cliente
    setSpotsLeft(Math.floor(Math.random() * 8) + 3);

    // Timer de urgência
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const plans = {
    mensal: {
      name: 'Plano Mensal',
      price: 'R$ 19,90',
      originalPrice: 'R$ 49,90',
      period: '/mês',
      discount: '60% OFF',
      features: [
        'Acesso completo a +2.000 receitas',
        'Planejador semanal inteligente',
        'Lista de compras automática',
        'Vídeos passo a passo',
        'Filtros avançados',
        'Suporte prioritário',
        'Novas receitas toda semana',
        'Cancele quando quiser'
      ]
    },
    anual: {
      name: 'Plano Anual',
      price: 'R$ 180,00',
      originalPrice: 'R$ 238,80',
      period: '/ano',
      discount: '25% OFF',
      badge: 'MAIS POPULAR',
      economy: 'Economize R$ 58,80',
      features: [
        'Tudo do plano mensal',
        'Acesso por 12 meses completos',
        'Apenas R$ 15,00/mês',
        'Economia de 25% no total',
        'Garantia de 30 dias',
        'Bônus: Guia de Substituições',
        'Bônus: Receitas Especiais',
        'Melhor custo-benefício'
      ]
    }
  };

  const currentPlan = plans[selectedPlan];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <ChefHat className="w-8 h-8 text-[#3BB273]" />
          <span className="text-2xl font-bold text-[#4A4A4A]">Easy Meal</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Urgency Timer */}
          {mounted && (
            <div className="bg-gradient-to-r from-[#FF8A42] to-[#3BB273] text-white p-6 rounded-2xl shadow-2xl mb-8 text-center">
              <p className="text-lg font-semibold mb-2">⚡ OFERTA ESPECIAL EXPIRA EM:</p>
              <div className="text-5xl font-bold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <p className="text-sm mt-2 opacity-90">Esta oferta é válida apenas para quem completou o quiz</p>
            </div>
          )}

          {/* Personalized Message */}
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3BB273]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-[#3BB273]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
                  Parabéns! Seu Plano Personalizado Está Pronto
                </h2>
                <p className="text-[#4A4A4A]">
                  Baseado nas suas respostas, identificamos que o <strong>Easy Meal</strong> é perfeito para você. Veja o que preparamos:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#3BB273]/10 p-4 rounded-lg">
                <Sparkles className="w-8 h-8 text-[#3BB273] mb-2" />
                <h3 className="font-bold text-[#4A4A4A] mb-1">Seu Perfil</h3>
                <p className="text-sm text-[#4A4A4A]">Planejador Inteligente</p>
              </div>
              <div className="bg-[#FF8A42]/10 p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 text-[#FF8A42] mb-2" />
                <h3 className="font-bold text-[#4A4A4A] mb-1">Economia Estimada</h3>
                <p className="text-sm text-[#4A4A4A]">R$ 350-450/mês</p>
              </div>
              <div className="bg-[#F4D06F]/10 p-4 rounded-lg">
                <Clock className="w-8 h-8 text-[#F4D06F] mb-2" />
                <h3 className="font-bold text-[#4A4A4A] mb-1">Tempo Economizado</h3>
                <p className="text-sm text-[#4A4A4A]">5-7 horas/semana</p>
              </div>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-[#4A4A4A] mb-6">
              Escolha Seu Plano
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plano Mensal */}
              <Card 
                className={`p-6 cursor-pointer transition-all rounded-xl ${
                  selectedPlan === 'mensal' 
                    ? 'border-4 border-[#FF8A42] shadow-2xl' 
                    : 'border-2 border-gray-200 hover:border-[#FF8A42]/50'
                }`}
                onClick={() => setSelectedPlan('mensal')}
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-2">
                    {plans.mensal.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-gray-500 line-through text-lg">{plans.mensal.originalPrice}</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[#4A4A4A]">{plans.mensal.price}</span>
                    <span className="text-gray-600">{plans.mensal.period}</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-[#FF8A42] text-white px-4 py-1 rounded-full text-sm font-bold">
                      {plans.mensal.discount}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {plans.mensal.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#4A4A4A]">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Plano Anual */}
              <Card 
                className={`p-6 cursor-pointer transition-all rounded-xl relative ${
                  selectedPlan === 'anual' 
                    ? 'border-4 border-[#3BB273] shadow-2xl' 
                    : 'border-2 border-gray-200 hover:border-[#3BB273]/50'
                }`}
                onClick={() => setSelectedPlan('anual')}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FF8A42] to-[#3BB273] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {plans.anual.badge}
                  </span>
                </div>
                <div className="text-center mb-4 mt-2">
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-2">
                    {plans.anual.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-gray-500 line-through text-lg">{plans.anual.originalPrice}</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[#4A4A4A]">{plans.anual.price}</span>
                    <span className="text-gray-600">{plans.anual.period}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <span className="bg-[#3BB273] text-white px-4 py-1 rounded-full text-sm font-bold inline-block">
                      {plans.anual.discount}
                    </span>
                    <p className="text-sm text-[#FF8A42] font-semibold">{plans.anual.economy}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {plans.anual.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#4A4A4A]">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Offer */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-2xl border-4 border-[#3BB273] relative overflow-hidden rounded-xl">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FF8A42] to-[#3BB273] text-white px-6 py-2 rounded-bl-2xl font-bold">
                  OFERTA LIMITADA
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-4">
                    {currentPlan.name}
                  </h2>
                  <p className="text-xl text-[#4A4A4A] mb-8">
                    Tudo que você precisa para transformar suas refeições
                  </p>

                  {/* Pricing Summary */}
                  <div className="bg-gradient-to-br from-[#3BB273]/10 to-[#FF8A42]/10 p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[#4A4A4A] line-through text-xl">{currentPlan.originalPrice}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-5xl font-bold text-[#4A4A4A]">{currentPlan.price}</p>
                          <span className="text-gray-600 text-lg">{currentPlan.period}</span>
                        </div>
                        {selectedPlan === 'anual' && (
                          <p className="text-[#FF8A42] font-semibold text-lg mt-1">
                            {currentPlan.economy}
                          </p>
                        )}
                      </div>
                      <div className="bg-[#FF8A42] text-white px-6 py-3 rounded-full font-bold text-xl">
                        {currentPlan.discount}
                      </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A]">
                      💳 Parcelamento disponível<br />
                      🔒 Pagamento 100% seguro via Kirvano
                    </p>
                  </div>

                  {/* Kirvano Checkout Button */}
                  <div className="mb-6">
                    <KirvanoCheckout 
                      checkoutUrl={KIRVANO_CHECKOUT_URL}
                      userEmail={userEmail}
                    />
                  </div>

                  {mounted && spotsLeft !== null && (
                    <p className="text-center text-sm text-[#4A4A4A] mt-4">
                      ⚡ Apenas {spotsLeft} vagas restantes neste preço
                    </p>
                  )}

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Após o pagamento, você será redirecionado de volta e terá acesso imediato ao Easy Meal
                  </p>
                </div>
              </Card>

              {/* Guarantee */}
              <div className="mt-8 bg-[#3BB273]/10 border-2 border-[#3BB273] p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <Shield className="w-12 h-12 text-[#3BB273] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">
                      Garantia Incondicional de 30 Dias
                    </h3>
                    <p className="text-[#4A4A4A]">
                      Se você não economizar pelo menos R$ 100 no primeiro mês ou não ficar 100% satisfeito, devolvemos seu dinheiro. Sem perguntas, sem burocracia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Testimonials */}
              <Card className="p-6 shadow-xl rounded-xl">
                <h3 className="font-bold text-[#4A4A4A] mb-4 text-lg">
                  ⭐ O Que Dizem Nossos Usuários
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Ana Paula',
                      text: 'Economizei R$ 380 no primeiro mês! Incrível!',
                      stars: 5
                    },
                    {
                      name: 'Roberto Silva',
                      text: 'Nunca mais perdi tempo pensando no que fazer de jantar.',
                      stars: 5
                    },
                    {
                      name: 'Carla Souza',
                      text: 'As receitas são maravilhosas e super fáceis!',
                      stars: 5
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#F4D06F] fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-[#4A4A4A] mb-1">"{testimonial.text}"</p>
                      <p className="text-xs text-[#4A4A4A]/70 font-semibold">{testimonial.name}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FAQ */}
              <Card className="p-6 shadow-xl rounded-xl">
                <h3 className="font-bold text-[#4A4A4A] mb-4 text-lg">
                  ❓ Perguntas Frequentes
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-[#4A4A4A] mb-1">Qual a diferença entre os planos?</p>
                    <p className="text-[#4A4A4A]">O plano anual oferece 25% de desconto e acesso por 12 meses. O mensal é renovado mensalmente.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#4A4A4A] mb-1">Posso parcelar?</p>
                    <p className="text-[#4A4A4A]">Sim, o parcelamento está disponível no checkout.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#4A4A4A] mb-1">Funciona no celular?</p>
                    <p className="text-[#4A4A4A]">Sim! Funciona em qualquer dispositivo.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#4A4A4A] mb-1">Quando recebo o acesso?</p>
                    <p className="text-[#4A4A4A]">Imediatamente após a confirmação do pagamento!</p>
                  </div>
                </div>
              </Card>

              {/* Trust Badges */}
              <Card className="p-6 shadow-xl bg-gradient-to-br from-[#3BB273]/10 to-[#FF8A42]/10 rounded-xl">
                <div className="text-center space-y-3">
                  <Shield className="w-12 h-12 text-[#3BB273] mx-auto" />
                  <p className="font-bold text-[#4A4A4A]">Pagamento Seguro</p>
                  <p className="text-sm text-[#4A4A4A]">
                    🔒 SSL Criptografado<br />
                    💳 Kirvano Verificado<br />
                    ✅ Dados Protegidos
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#3BB273] to-[#FF8A42] text-white p-8 rounded-2xl text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Não Perca Esta Oportunidade!
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Mais de 10.000 famílias já transformaram suas refeições.<br />
              Seja a próxima!
            </p>
            <div className="flex justify-center">
              <KirvanoCheckout 
                checkoutUrl={KIRVANO_CHECKOUT_URL}
                userEmail={userEmail}
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-900 mb-3">📌 Como Funciona o Pagamento</h3>
            <ol className="space-y-2 text-sm text-blue-900">
              <li>1. Escolha seu plano (mensal ou anual)</li>
              <li>2. Clique no botão "Garantir Meu Acesso Agora"</li>
              <li>3. Você será redirecionado para o checkout seguro do Kirvano</li>
              <li>4. Preencha seus dados e escolha a forma de pagamento</li>
              <li>5. Após a confirmação, você será redirecionado de volta</li>
              <li>6. Seu acesso será liberado IMEDIATAMENTE!</li>
            </ol>
            <p className="text-xs text-blue-700 mt-4">
              💡 O Kirvano é uma plataforma segura e confiável de pagamentos online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
