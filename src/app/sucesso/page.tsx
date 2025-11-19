'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChefHat, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function SucessoPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar email do checkout
    const checkoutEmail = localStorage.getItem('checkoutEmail');
    if (checkoutEmail) {
      setEmail(checkoutEmail);
    }

    // Marcar pagamento como concluído
    localStorage.setItem('paymentCompleted', 'true');
    localStorage.setItem('paymentDate', new Date().toISOString());
    localStorage.setItem('hasFullAccess', 'true');
    
    // Marcar que acabou de pagar (para mostrar modal no app)
    sessionStorage.setItem('justPaid', 'true');

    // Limpar dados temporários do checkout
    localStorage.removeItem('checkoutStarted');

    setLoading(false);

    // Confetti effect (opcional)
    if (typeof window !== 'undefined') {
      // Adicionar animação de celebração aqui se desejar
    }
  }, []);

  const handleAccessApp = () => {
    router.push('/app');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#3BB273] mx-auto mb-4"></div>
          <p className="text-[#4A4A4A] font-semibold">Processando seu acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3BB273]/10 via-[#FAF9F6] to-[#FF8A42]/10">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <ChefHat className="w-8 h-8 text-[#3BB273]" />
          <span className="text-2xl font-bold text-[#4A4A4A]">Easy Meal</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#3BB273] rounded-full mb-6 animate-bounce">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-4">
              🎉 Pagamento Confirmado!
            </h1>
            <p className="text-xl text-[#4A4A4A]">
              Bem-vindo ao Easy Meal! Seu acesso completo foi liberado.
            </p>
          </div>

          {/* Welcome Card */}
          <Card className="p-8 shadow-2xl mb-8 rounded-xl">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#3BB273]/10 to-[#FF8A42]/10 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#FF8A42]" />
                  O Que Você Acabou de Desbloquear
                </h2>
                <div className="space-y-3">
                  {[
                    'Acesso vitalício a +2.000 receitas brasileiras',
                    'Planejador semanal inteligente',
                    'Lista de compras automática',
                    'Vídeos passo a passo',
                    'Filtros avançados (tempo, custo, dificuldade)',
                    'Calculadora de porções',
                    'Suporte prioritário',
                    'Novas receitas toda semana',
                    'Comunidade exclusiva de membros'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4A4A4A]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {email && (
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                  <p className="text-sm text-blue-900">
                    📧 Um email de confirmação foi enviado para: <strong>{email}</strong>
                  </p>
                </div>
              )}

              <div className="text-center space-y-4">
                <Button
                  size="lg"
                  onClick={handleAccessApp}
                  className="bg-gradient-to-r from-[#FF8A42] to-[#3BB273] hover:opacity-90 text-white px-8 py-6 text-lg font-bold shadow-xl rounded-[14px] h-[56px]"
                >
                  Acessar Easy Meal Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-[#4A4A4A]">
                  ⚡ Seu acesso está 100% ativo e pronto para usar!
                </p>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 shadow-xl rounded-xl">
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
              🚀 Próximos Passos Recomendados
            </h3>
            <ol className="space-y-3 text-[#4A4A4A]">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#3BB273] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Explore as receitas e encontre suas favoritas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#3BB273] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Monte o planejamento da sua primeira semana</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#3BB273] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Gere sua lista de compras automática</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#3BB273] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Comece a economizar e cozinhar melhor!</span>
              </li>
            </ol>
          </Card>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#4A4A4A]">
              💬 Precisa de ajuda? Entre em contato com nosso suporte prioritário
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
