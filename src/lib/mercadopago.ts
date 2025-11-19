import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
  }
});

export const preferenceClient = new Preference(client);
export const paymentClient = new Payment(client);

// Tipos para facilitar o uso
export interface CreatePreferenceData {
  title: string;
  description: string;
  price: number;
  quantity: number;
  userId?: string;
  userEmail?: string;
}

export interface WebhookNotification {
  id: string;
  live_mode: boolean;
  type: string;
  date_created: string;
  application_id: string;
  user_id: string;
  version: string;
  api_version: string;
  action: string;
  data: {
    id: string;
  };
}
