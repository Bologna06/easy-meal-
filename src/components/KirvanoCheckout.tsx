'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface KirvanoCheckoutProps {
  checkoutUrl: string;
  userEmail?: string;
}

export default function KirvanoCheckout({ checkoutUrl, userEmail }: KirvanoCheckoutProps) {
  
  const handleCheckout = () => {
    // Salvar email do usuário antes de redirecionar
    if (userEmail) {
      localStorage.setItem('checkoutEmail', userEmail);
    }
    
    // Salvar timestamp do início do checkout
    localStorage.setItem('checkoutStarted', Date.now().toString());
    
    // Redirecionar para o checkout do Kirvano
    window.location.href = checkoutUrl;
  };

  return (
    <div className="space-y-4">
      <Button
        size="lg"
        onClick={handleCheckout}
        className="w-full bg-gradient-to-r from-[#FF8A42] to-[#3BB273] hover:opacity-90 text-white px-8 py-6 text-lg font-bold shadow-2xl transition-all rounded-[14px] h-[56px]"
      >
        Garantir Meu Acesso Agora
        <ExternalLink className="w-5 h-5 ml-2" />
      </Button>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-[#4A4A4A]">
          🔒 Pagamento 100% seguro via Kirvano
        </p>
        <p className="text-xs text-[#4A4A4A]/70">
          Você será redirecionado para finalizar o pagamento
        </p>
      </div>
    </div>
  );
}
