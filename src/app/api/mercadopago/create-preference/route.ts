import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
  }
});

const preference = new Preference(client);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, userName } = body;

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'userId e userEmail são obrigatórios' },
        { status: 400 }
      );
    }

    // Criar preferência de pagamento
    const preferenceData = {
      items: [
        {
          id: 'easy-meal-access',
          title: 'Easy Meal - Acesso Completo',
          description: 'Acesso completo ao Easy Meal com +2.000 receitas e planejamento de refeições',
          quantity: 1,
          unit_price: 97.00, // Valor em reais
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: userEmail,
        name: userName || '',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/pendente`,
      },
      auto_return: 'approved' as const,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
      external_reference: userId, // ID do usuário para identificar depois
      statement_descriptor: 'EASY MEAL',
      metadata: {
        user_id: userId,
        user_email: userEmail,
        product: 'easy-meal-access',
      },
    };

    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferência criada:', {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    });

  } catch (error: any) {
    console.error('❌ Erro ao criar preferência:', error);
    
    return NextResponse.json(
      {
        error: 'Erro ao criar preferência de pagamento',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
