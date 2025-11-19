'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function PagamentoFalhaPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    console.log('❌ Página de falha carregada:', {
      paymentId,
      status,
    });
  }, [paymentId, status]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Ícone de Erro */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#4A4A4A]">
            Pagamento Não Aprovado
          </h1>
          <p className="text-[#4A4A4A]/70">
            Não foi possível processar seu pagamento
          </p>
        </div>

        {/* Motivos Comuns */}
        <div className="text-left space-y-3 bg-red-50 rounded-xl p-4">
          <h3 className="font-bold text-[#4A4A4A]">Possíveis motivos:</h3>
          <ul className="space-y-2 text-sm text-[#4A4A4A]/70 list-disc list-inside">
            <li>Saldo insuficiente</li>
            <li>Dados do cartão incorretos</li>
            <li>Limite de crédito excedido</li>
            <li>Pagamento recusado pelo banco</li>
          </ul>
        </div>

        {/* Informações */}
        {paymentId && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#4A4A4A]/70">ID do Pagamento:</span>
              <span className="font-mono text-[#4A4A4A]">{paymentId}</span>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/checkout'}
            className="w-full bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white py-6 text-lg font-bold rounded-xl"
          >
            Tentar Novamente
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full py-6 text-lg rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>
        </div>

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
