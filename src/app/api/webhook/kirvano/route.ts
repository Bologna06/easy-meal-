import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Webhook da Kirvano para processar pagamentos
 * 
 * CONFIGURAÇÃO NECESSÁRIA:
 * 1. No dashboard da Kirvano, configure este endpoint como webhook URL:
 *    https://seu-dominio.com/api/webhook/kirvano
 * 
 * 2. A Kirvano enviará notificações POST quando:
 *    - Pagamento for aprovado
 *    - Assinatura for renovada
 *    - Assinatura for cancelada
 * 
 * 3. Estrutura esperada do payload (verificar documentação Kirvano):
 *    {
 *      event: 'payment.approved' | 'subscription.renewed' | 'subscription.cancelled',
 *      data: {
 *        transaction_id: string,
 *        customer_email: string,
 *        amount: number,
 *        plan: 'monthly' | 'annual',
 *        status: string
 *      }
 *    }
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    console.log('Webhook Kirvano recebido:', payload);

    // Validar assinatura do webhook (se Kirvano fornecer)
    // const signature = request.headers.get('x-kirvano-signature');
    // if (!validateSignature(payload, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const { event, data } = payload;

    switch (event) {
      case 'payment.approved':
        await handlePaymentApproved(data);
        break;
      
      case 'subscription.renewed':
        await handleSubscriptionRenewed(data);
        break;
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data);
        break;
      
      default:
        console.log('Evento não reconhecido:', event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook Kirvano:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentApproved(data: any) {
  const { customer_email, plan, transaction_id } = data;

  // Calcular data de expiração
  const expiryDate = new Date();
  if (plan === 'monthly') {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else if (plan === 'annual') {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }

  // Atualizar usuário no banco
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: plan,
      subscription_expiry: expiryDate.toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('email', customer_email);

  if (error) {
    console.error('Erro ao atualizar assinatura:', error);
    throw error;
  }

  // Registrar pagamento
  await supabase.from('payments').insert({
    user_email: customer_email,
    transaction_id,
    amount: plan === 'monthly' ? 19.90 : 180,
    plan,
    status: 'approved',
    created_at: new Date().toISOString()
  });

  console.log(`Assinatura ${plan} ativada para ${customer_email}`);
}

async function handleSubscriptionRenewed(data: any) {
  // Similar ao handlePaymentApproved
  await handlePaymentApproved(data);
}

async function handleSubscriptionCancelled(data: any) {
  const { customer_email } = data;

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'free',
      subscription_expiry: null,
      updated_at: new Date().toISOString()
    })
    .eq('email', customer_email);

  if (error) {
    console.error('Erro ao cancelar assinatura:', error);
    throw error;
  }

  console.log(`Assinatura cancelada para ${customer_email}`);
}

// Função para validar assinatura do webhook (implementar conforme doc Kirvano)
// function validateSignature(payload: any, signature: string | null): boolean {
//   if (!signature) return false;
//   // Implementar validação usando secret key da Kirvano
//   return true;
// }
