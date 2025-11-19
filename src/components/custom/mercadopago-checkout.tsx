'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MercadoPagoCheckoutProps {
  userId: string;
  userEmail: string;
  amount?: number;
  description?: string;
}

export function MercadoPagoCheckout({
  userId,
  userEmail,
  amount = 97.00,
  description = 'Easy Meal - Acesso Completo'
}: MercadoPagoCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Criar preferência de pagamento
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email: userEmail,
          amount,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar pagamento');
      }

      // Redirecionar para checkout do Mercado Pago
      // Em sandbox, use sandboxInitPoint
      const checkoutUrl = process.env.NODE_ENV === 'production' 
        ? data.initPoint 
        : data.sandboxInitPoint;

      window.location.href = checkoutUrl;

    } catch (error: any) {
      console.error('Erro ao processar pagamento:', error);
      toast.error(error.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      size="lg"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          Comprar Easy Meal - R$ {amount.toFixed(2)}
        </>
      )}
    </Button>
  );
}
