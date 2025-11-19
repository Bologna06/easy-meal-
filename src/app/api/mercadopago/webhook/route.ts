import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

const paymentClient = new Payment(client);

// Tipos de notificações do Mercado Pago
type NotificationType = 'payment' | 'merchant_order' | 'subscription' | 'invoice';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🔔 Webhook recebido:', JSON.stringify(body, null, 2));

    // Validar tipo de notificação
    const notificationType: NotificationType = body.type || body.topic;
    const notificationId = body.data?.id || body.id;

    if (!notificationId) {
      console.error('❌ ID de notificação não encontrado');
      return NextResponse.json({ error: 'ID não encontrado' }, { status: 400 });
    }

    // Processar apenas notificações de pagamento
    if (notificationType === 'payment') {
      console.log(`📋 Processando pagamento ID: ${notificationId}`);

      // Buscar informações do pagamento
      const payment = await paymentClient.get({ id: notificationId });

      console.log('💳 Dados do pagamento:', {
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
        external_reference: payment.external_reference,
        transaction_amount: payment.transaction_amount,
        payer_email: payment.payer?.email,
      });

      // Verificar se o pagamento foi aprovado
      if (payment.status === 'approved') {
        const userId = payment.external_reference; // ID do usuário
        const userEmail = payment.payer?.email;

        console.log('✅ PAGAMENTO APROVADO!');
        console.log(`👤 Usuário: ${userId} (${userEmail})`);
        console.log(`💰 Valor: R$ ${payment.transaction_amount}`);

        // AQUI VOCÊ DEVE IMPLEMENTAR A LÓGICA DE LIBERAÇÃO DE ACESSO
        // Exemplos:
        // 1. Atualizar banco de dados (Supabase, PostgreSQL, etc.)
        // 2. Enviar email de confirmação
        // 3. Ativar assinatura
        // 4. Criar registro de acesso

        // Exemplo de estrutura para salvar no banco:
        /*
        await supabase
          .from('user_payments')
          .insert({
            user_id: userId,
            payment_id: payment.id,
            status: 'approved',
            amount: payment.transaction_amount,
            payment_method: payment.payment_method_id,
            approved_at: new Date().toISOString(),
          });

        await supabase
          .from('users')
          .update({ has_access: true, access_granted_at: new Date().toISOString() })
          .eq('id', userId);
        */

        // Log para desenvolvimento
        console.log('🎉 ACESSO LIBERADO PARA:', {
          userId,
          userEmail,
          paymentId: payment.id,
          amount: payment.transaction_amount,
        });

        return NextResponse.json({
          success: true,
          message: 'Pagamento processado e acesso liberado',
          userId,
        });
      }

      // Outros status de pagamento
      if (payment.status === 'pending') {
        console.log('⏳ Pagamento pendente');
      } else if (payment.status === 'rejected') {
        console.log('❌ Pagamento rejeitado:', payment.status_detail);
      } else if (payment.status === 'cancelled') {
        console.log('🚫 Pagamento cancelado');
      }

      return NextResponse.json({
        success: true,
        message: `Pagamento ${payment.status}`,
      });
    }

    // Outros tipos de notificação
    console.log(`ℹ️ Notificação do tipo "${notificationType}" ignorada`);
    return NextResponse.json({ success: true, message: 'Notificação recebida' });

  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', error);
    
    // Retornar 200 mesmo com erro para evitar reenvios do Mercado Pago
    return NextResponse.json(
      {
        error: 'Erro ao processar webhook',
        details: error.message,
      },
      { status: 200 } // Importante: retornar 200 para não reenviar
    );
  }
}

// Endpoint GET para validação (Mercado Pago pode fazer GET para testar)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook endpoint ativo',
  });
}
