'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChefHat, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AssinarPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    setLoading(true);
    
    // Redirecionar para o checkout da Kirvano
    const checkoutUrl = 'https://pay.kirvano.com/eb308bf0-e9a3-49d9-99e0-fa545d14f2b1';
    
    // Adicionar parâmetros se necessário (plan type, user info, etc)
    // Por enquanto, redirecionamento direto
    window.location.href = checkoutUrl;
  };

  const features = [
    'Acesso a +2.000 receitas brasileiras e internacionais',
    'Planner semanal ilimitado',
    'Lista de compras automática',
    'Filtros avançados por dieta e preferências',
    'Registro de receitas concluídas',
    'Sistema de reposição de ingredientes',
    'Suporte prioritário',
    'Atualizações constantes com novas receitas'
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-[#3BB273]" />
            <span className="text-xl font-bold text-[#4A4A4A]">Easy Meal</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF8A42]/10 text-[#FF8A42] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Oferta Especial de Lançamento
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A4A4A] mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-[#4A4A4A]/70 max-w-2xl mx-auto">
            Transforme sua rotina na cozinha e economize tempo e dinheiro
          </p>
        </div>

        {/* Planos */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Plano Mensal */}
          <Card className="relative hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-[#4A4A4A]">Plano Mensal</CardTitle>
              <CardDescription>Perfeito para começar</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-[#4A4A4A]">R$ 19,90</span>
                <span className="text-[#4A4A4A]/70">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4A4A4A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white"
                onClick={() => handleSubscribe('monthly')}
                disabled={loading}
              >
                {loading ? 'Redirecionando...' : 'Assinar Agora'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Anual */}
          <Card className="relative hover:shadow-2xl transition-all border-[#3BB273] border-2">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#3BB273] text-white px-4 py-1">
              Mais Popular - Economize 25%
            </Badge>
            
            <CardHeader>
              <CardTitle className="text-2xl text-[#4A4A4A]">Plano Anual</CardTitle>
              <CardDescription>Melhor custo-benefício</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold text-[#4A4A4A]">R$ 180</span>
                <span className="text-[#4A4A4A]/70">/ano</span>
              </div>
              <p className="text-sm text-[#3BB273] font-semibold mt-2">
                Equivalente a R$ 15/mês • Economize R$ 58,80
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4A4A4A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-[#3BB273] hover:bg-[#3BB273]/90 text-white"
                onClick={() => handleSubscribe('annual')}
                disabled={loading}
              >
                {loading ? 'Redirecionando...' : 'Assinar Plano Anual'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Garantia */}
        <Card className="max-w-3xl mx-auto bg-[#3BB273]/10 border-[#3BB273]">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">
              🛡️ Garantia de 7 Dias
            </h3>
            <p className="text-[#4A4A4A]/80">
              Experimente o Easy Meal sem riscos. Se não ficar satisfeito nos primeiros 7 dias, 
              devolvemos 100% do seu dinheiro, sem perguntas.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Rápido */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-[#4A4A4A] text-center mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]/80">
                  Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona o pagamento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]/80">
                  O pagamento é processado de forma segura pela Kirvano. Aceitamos cartão de crédito e PIX.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso usar em múltiplos dispositivos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]/80">
                  Sim! Sua conta funciona em qualquer dispositivo - computador, tablet ou celular.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
