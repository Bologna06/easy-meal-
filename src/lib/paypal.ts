// Configuração do PayPal
export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  mode: process.env.NEXT_PUBLIC_PAYPAL_MODE || 'sandbox', // 'sandbox' ou 'live'
  currency: 'BRL',
  price: '97.00',
  productName: 'Easy Meal - Acesso Vitalício',
  productDescription: 'Acesso completo e vitalício ao Easy Meal com mais de 2000 receitas'
};

// URLs do PayPal
export const PAYPAL_API_URL = PAYPAL_CONFIG.mode === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Gerar token de acesso do PayPal
export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${PAYPAL_CONFIG.clientId}:${PAYPAL_CONFIG.clientSecret}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error('Falha ao obter token do PayPal');
  }

  const data = await response.json();
  return data.access_token;
}

// Verificar se o pagamento foi aprovado
export async function verifyPayPalPayment(orderId: string): Promise<boolean> {
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error('❌ Erro ao verificar pagamento:', response.status);
      return false;
    }

    const order = await response.json();
    console.log('✅ Status do pagamento:', order.status);
    
    return order.status === 'COMPLETED' || order.status === 'APPROVED';
  } catch (error) {
    console.error('❌ Erro ao verificar pagamento PayPal:', error);
    return false;
  }
}

// Log de erro estruturado
export function logPayPalError(context: string, error: any) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    error: error.message || error,
    stack: error.stack
  };
  
  console.error('🚨 ERRO PAYPAL:', JSON.stringify(errorLog, null, 2));
  
  // Em produção, enviar para serviço de log (Sentry, LogRocket, etc)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      tags: { context: 'paypal' },
      extra: errorLog
    });
  }
}
