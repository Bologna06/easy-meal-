import { NextRequest, NextResponse } from 'next/server';
import { PAYPAL_CONFIG, PAYPAL_API_URL, getPayPalAccessToken, logPayPalError } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 Iniciando criação de ordem PayPal...');
    
    const body = await request.json();
    const { userEmail } = body;
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email do usuário é obrigatório' },
        { status: 400 }
      );
    }
    
    // Obter token de acesso
    const accessToken = await getPayPalAccessToken();
    console.log('✅ Token de acesso obtido');
    
    // Criar ordem no PayPal
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: PAYPAL_CONFIG.currency,
            value: PAYPAL_CONFIG.price
          },
          description: PAYPAL_CONFIG.productDescription,
          custom_id: userEmail // Salvar email do usuário
        }
      ],
      application_context: {
        brand_name: 'Easy Meal',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/paypal/capture-order`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/oferta?canceled=true`
      }
    };
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro ao criar ordem:', errorData);
      logPayPalError('create-order', errorData);
      
      return NextResponse.json(
        { error: 'Falha ao criar ordem no PayPal', details: errorData },
        { status: response.status }
      );
    }
    
    const order = await response.json();
    console.log('✅ Ordem criada com sucesso:', order.id);
    
    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      links: order.links
    });
    
  } catch (error: any) {
    console.error('❌ Erro no endpoint create-order:', error);
    logPayPalError('create-order-endpoint', error);
    
    return NextResponse.json(
      { error: 'Erro interno ao processar pagamento', message: error.message },
      { status: 500 }
    );
  }
}
