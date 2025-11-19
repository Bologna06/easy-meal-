'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Check } from 'lucide-react';

interface MercadoPagoCheckoutProps {
  userId: string;
  userEmail: string;
  userName?: string;
}

export default function MercadoPagoCheckout({
  userId,
  userEmail,
  userName,
}: MercadoPagoCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🛒 Iniciando checkout para:', { userId, userEmail });

      // Criar preferência de pagamento
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userEmail,
          userName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar checkout');
      }

      console.log('✅ Preferência criada:', data);

      // Redirecionar para o checkout do Mercado Pago
      // Em produção, use initPoint
      // Em desenvolvimento/sandbox, use sandboxInitPoint
      const checkoutUrl = data.sandboxInitPoint || data.initPoint;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('URL de checkout não encontrada');
      }

    } catch (err: any) {
      console.error('❌ Erro no checkout:', err);
      setError(err.message || 'Erro ao processar pagamento');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3BB273]/10 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-[#3BB273]" />
          </div>
          <h2 className="text-2xl font-bold text-[#4A4A4A]">
            Easy Meal - Acesso Completo
          </h2>
          <p className="text-[#4A4A4A]/70">
            Tenha acesso a +2.000 receitas e planejamento inteligente
          </p>
        </div>

        {/* Preço */}
        <div className="bg-[#3BB273]/5 rounded-xl p-6 text-center">
          <div className="text-sm text-[#4A4A4A]/70 mb-1">Investimento único</div>
          <div className="text-4xl font-bold text-[#3BB273]">
            R$ 97,00
          </div>
          <div className="text-sm text-[#4A4A4A]/70 mt-1">Pagamento único</div>
        </div>

        {/* Benefícios */}
        <div className="space-y-3">
          {[
            'Acesso vitalício a +2.000 receitas',
            'Planejamento semanal automatizado',
            'Lista de compras inteligente',
            'Suporte prioritário',
            'Atualizações gratuitas',
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-[#3BB273] flex-shrink-0" />
              <span className="text-[#4A4A4A]">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Botão de Pagamento */}
        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pagar com Mercado Pago
            </>
          )}
        </Button>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Segurança */}
        <div className="text-center text-xs text-[#4A4A4A]/50">
          🔒 Pagamento 100% seguro via Mercado Pago
        </div>
      </div>
    </div>
  );
}
