'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CheckCircle, XCircle } from 'lucide-react';

interface MercadoPagoButtonProps {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  userId?: string;
  userEmail?: string;
  buttonText?: string;
  className?: string;
}

export default function MercadoPagoButton({
  title = 'Acesso Easy Meal',
  description = 'Acesso completo ao planejador de refeições',
  price = 97.00,
  quantity = 1,
  userId,
  userEmail,
  buttonText = 'Garantir Meu Acesso Agora',
  className = '',
}: MercadoPagoButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Criar preferência de pagamento
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price,
          quantity,
          userId,
          userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar pagamento');
      }

      // Redirecionar para o checkout do Mercado Pago
      // Em produção, use initPoint
      // Em desenvolvimento/testes, use sandboxInitPoint
      const checkoutUrl = process.env.NODE_ENV === 'production' 
        ? data.initPoint 
        : data.sandboxInitPoint || data.initPoint;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('URL de checkout não disponível');
      }

    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err);
      setError(err.message || 'Erro ao processar pagamento');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayment}
        disabled={loading}
        size="lg"
        className={`w-full ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            {buttonText}
          </>
        )}
      </Button>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
