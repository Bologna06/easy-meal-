'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function PagamentoSucessoPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    console.log('✅ Página de sucesso carregada:', {
      paymentId,
      status,
      externalReference,
    });
  }, [paymentId, status, externalReference]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Ícone de Sucesso */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#3BB273]/10 rounded-full">
          <CheckCircle className="w-12 h-12 text-[#3BB273]" />
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#4A4A4A]">
            Pagamento Aprovado! 🎉
          </h1>
          <p className="text-[#4A4A4A]/70">
            Seu acesso ao Easy Meal foi liberado com sucesso!
          </p>
        </div>

        {/* Informações */}
        <div className="bg-[#3BB273]/5 rounded-xl p-4 space-y-2 text-sm">
          {paymentId && (
            <div className="flex justify-between">
              <span className="text-[#4A4A4A]/70">ID do Pagamento:</span>
              <span className="font-mono text-[#4A4A4A]">{paymentId}</span>
            </div>
          )}
          {status && (
            <div className="flex justify-between">
              <span className="text-[#4A4A4A]/70">Status:</span>
              <span className="font-semibold text-[#3BB273]">
                {status === 'approved' ? 'Aprovado' : status}
              </span>
            </div>
          )}
        </div>

        {/* Próximos Passos */}
        <div className="text-left space-y-3 bg-blue-50 rounded-xl p-4">
          <h3 className="font-bold text-[#4A4A4A]">Próximos passos:</h3>
          <ol className="space-y-2 text-sm text-[#4A4A4A]/70">
            <li>1. Você receberá um email de confirmação</li>
            <li>2. Seu acesso já está ativo</li>
            <li>3. Comece a explorar as +2.000 receitas</li>
          </ol>
        </div>

        {/* Botão de Ação */}
        <Button
          onClick={() => window.location.href = '/app'}
          className="w-full bg-[#3BB273] hover:bg-[#3BB273]/90 text-white py-6 text-lg font-bold rounded-xl"
        >
          Acessar Minhas Receitas
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Link de Suporte */}
        <p className="text-xs text-[#4A4A4A]/50">
          Precisa de ajuda? Entre em contato com nosso{' '}
          <a href="/suporte" className="text-[#3BB273] underline">
            suporte
          </a>
        </p>
      </div>
    </div>
  );
}
