import { NextRequest, NextResponse } from 'next/server';
import { PAYPAL_API_URL, getPayPalAccessToken, logPayPalError } from '@/lib/paypal';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token'); // Order ID do PayPal
    
    if (!token) {
      console.error('❌ Token não fornecido');
      return NextResponse.redirect(new URL('/oferta?error=no-token', request.url));
    }
    
    console.log('🔵 Capturando pagamento para ordem:', token);
    
    // Obter token de acesso
    const accessToken = await getPayPalAccessToken();
    
    // Capturar o pagamento
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro ao capturar pagamento:', errorData);
      logPayPalError('capture-order', errorData);
      
      return NextResponse.redirect(
        new URL('/oferta?error=capture-failed', request.url)
      );
    }
    
    const captureData = await response.json();
    console.log('✅ Pagamento capturado com sucesso:', captureData.id);
    console.log('📊 Status:', captureData.status);
    
    // Verificar se o pagamento foi completado
    if (captureData.status === 'COMPLETED') {
      const userEmail = captureData.purchase_units[0]?.custom_id || '';
      const paymentId = captureData.id;
      
      console.log('🎉 PAGAMENTO APROVADO!');
      console.log('📧 Email:', userEmail);
      console.log('💳 Payment ID:', paymentId);
      
      // Redirecionar para página de sucesso com dados do pagamento
      const successUrl = new URL('/app', request.url);
      successUrl.searchParams.set('payment', 'success');
      successUrl.searchParams.set('orderId', paymentId);
      successUrl.searchParams.set('email', userEmail);
      
      return NextResponse.redirect(successUrl);
    } else {
      console.error('❌ Pagamento não completado. Status:', captureData.status);
      return NextResponse.redirect(
        new URL('/oferta?error=payment-incomplete', request.url)
      );
    }
    
  } catch (error: any) {
    console.error('❌ Erro no endpoint capture-order:', error);
    logPayPalError('capture-order-endpoint', error);
    
    return NextResponse.redirect(
      new URL('/oferta?error=internal-error', request.url)
    );
  }
}
