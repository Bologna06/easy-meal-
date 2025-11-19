import { NextRequest, NextResponse } from 'next/server';
import { verifyPayPalPayment, logPayPalError } from '@/lib/paypal';

// Webhook do PayPal para notificações de pagamento
export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Webhook PayPal recebido');
    
    const body = await request.json();
    const eventType = body.event_type;
    
    console.log('📨 Tipo de evento:', eventType);
    
    // Eventos relevantes do PayPal
    switch (eventType) {
      case 'CHECKOUT.ORDER.APPROVED':
        console.log('✅ Ordem aprovada:', body.resource.id);
        // Ordem foi aprovada, mas ainda não capturada
        break;
        
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('💰 Pagamento capturado:', body.resource.id);
        const orderId = body.resource.supplementary_data?.related_ids?.order_id;
        
        if (orderId) {
          const isValid = await verifyPayPalPayment(orderId);
          console.log('🔍 Pagamento verificado:', isValid);
          
          // Aqui você pode adicionar lógica adicional, como:
          // - Enviar email de confirmação
          // - Atualizar banco de dados
          // - Notificar outros sistemas
        }
        break;
        
      case 'PAYMENT.CAPTURE.DENIED':
        console.log('❌ Pagamento negado:', body.resource.id);
        break;
        
      case 'PAYMENT.CAPTURE.REFUNDED':
        console.log('💸 Pagamento reembolsado:', body.resource.id);
        break;
        
      default:
        console.log('ℹ️ Evento não tratado:', eventType);
    }
    
    // Sempre retornar 200 para o PayPal saber que recebemos o webhook
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', error);
    logPayPalError('webhook', error);
    
    // Mesmo com erro, retornar 200 para não ficar recebendo o mesmo webhook
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

// Verificação de saúde do webhook
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'PayPal Webhook endpoint is running'
  });
}
