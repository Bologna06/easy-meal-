'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';

function PagamentoPendenteContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    console.log('⏳ Página de pendente carregada:', {
      paymentId,
      status,
    });
  }, [paymentId, status]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Ícone de Pendente */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
          <Clock className="w-12 h-12 text-yellow-600" />
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#4A4A4A]">
            Pagamento Pendente
          </h1>
          <p className="text-[#4A4A4A]/70">
            Estamos aguardando a confirmação do seu pagamento
          </p>
        </div>

        {/* Informações */}
        <div className="bg-yellow-50 rounded-xl p-4 space-y-2 text-sm">
          {paymentId && (
            <div className="flex justify-between">
              <span className="text-[#4A4A4A]/70">ID do Pagamento:</span>
              <span className="font-mono text-[#4A4A4A]">{paymentId}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#4A4A4A]/70">Status:</span>
            <span className="font-semibold text-yellow-600">Pendente</span>
          </div>
        </div>

        {/* Próximos Passos */}
        <div className="text-left space-y-3 bg-blue-50 rounded-xl p-4">
          <h3 className="font-bold text-[#4A4A4A]">O que acontece agora?</h3>
          <ul className="space-y-2 text-sm text-[#4A4A4A]/70 list-disc list-inside">
            <li>Seu pagamento está sendo processado</li>
            <li>Você receberá um email quando for aprovado</li>
            <li>Isso pode levar alguns minutos ou horas</li>
            <li>Seu acesso será liberado automaticamente</li>
          </ul>
        </div>

        {/* Métodos que podem ficar pendentes */}
        <div className="text-left space-y-2 bg-gray-50 rounded-xl p-4 text-xs text-[#4A4A4A]/70">
          <p className="font-semibold text-[#4A4A4A]">Métodos que podem ficar pendentes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Boleto bancário (até 3 dias úteis)</li>
            <li>PIX (alguns minutos)</li>
            <li>Transferência bancária</li>
          </ul>
        </div>

        {/* Botão de Ação */}
        <Button
          onClick={() => window.location.href = '/'}
          className="w-full bg-[#3BB273] hover:bg-[#3BB273]/90 text-white py-6 text-lg font-bold rounded-xl"
        >
          Voltar ao Início
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

export default function PagamentoPendentePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 text-yellow-600 animate-pulse mx-auto" />
          <p className="mt-4 text-[#4A4A4A]/70">Carregando...</p>
        </div>
      </div>
    }>
      <PagamentoPendenteContent />
    </Suspense>
  );
}
