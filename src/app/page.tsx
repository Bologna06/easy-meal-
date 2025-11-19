'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, Clock, Heart, Star, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#FF8A42]/10 text-[#FF8A42] px-4 py-2 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4 fill-current" />
            Mais de 10.000 famílias já transformaram suas refeições
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A4A4A] leading-tight">
            Pare de Perder Tempo Pensando
            <span className="block text-[#3BB273]">
              "O Que Vou Fazer de Jantar?"
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
            Descubra como <strong>planejar suas refeições em minutos</strong>, economizar no mercado e nunca mais ficar sem ideias na cozinha.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all rounded-[14px] h-[56px]"
              onClick={() => window.location.href = '/quiz'}
            >
              Começar Agora - É Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-[#4A4A4A]">
              ⚡ Descubra seu plano ideal em 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3BB273] mb-12">
              Você se identifica com isso?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '😰 Chega 18h e você não sabe o que fazer de jantar',
                '💸 Gasta muito no mercado comprando coisas que não usa',
                '⏰ Perde tempo procurando receitas no Google todo dia',
                '🍕 Acaba pedindo delivery porque "não tem nada em casa"',
                '😫 Sempre faz as mesmas 5 receitas e a família reclama',
                '🛒 Vai ao mercado sem lista e esquece metade das coisas'
              ].map((problem, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                  <span className="text-lg">{problem}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-xl text-[#4A4A4A] mb-6">
                <strong>E se você pudesse resolver TODOS esses problemas</strong> com uma única ferramenta?
              </p>
              <Button 
                size="lg"
                className="bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white px-8 py-6 text-lg rounded-[14px] h-[56px]"
                onClick={() => window.location.href = '/quiz'}
              >
                Sim, Quero Resolver Isso Agora!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <ChefHat className="w-12 h-12 text-[#3BB273]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#4A4A4A] mb-4">
                Conheça o <span className="text-[#3BB273]">Easy Meal</span>
              </h2>
              <p className="text-xl text-[#4A4A4A]">
                Planeje, cozinhe e viva melhor.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Clock className="w-10 h-10" />,
                  title: 'Planeje em Minutos',
                  description: 'Monte o cardápio da semana inteira em menos de 5 minutos'
                },
                {
                  icon: <Heart className="w-10 h-10" />,
                  title: '+2.000 Receitas',
                  description: 'Receitas brasileiras testadas e aprovadas por milhares de pessoas'
                },
                {
                  icon: <ChefHat className="w-10 h-10" />,
                  title: 'Lista Automática',
                  description: 'Gere sua lista de compras automaticamente com todos os ingredientes'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3BB273]/10 text-[#3BB273] rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{feature.title}</h3>
                  <p className="text-[#4A4A4A]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3BB273] mb-12">
              Como Funciona?
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Responda um Quiz Rápido',
                  description: 'Conte-nos sobre seus hábitos alimentares, preferências e objetivos (leva 2 minutos)'
                },
                {
                  step: '2',
                  title: 'Receba Seu Plano Personalizado',
                  description: 'Baseado nas suas respostas, criamos um plano ideal para você e sua família'
                },
                {
                  step: '3',
                  title: 'Acesse +2.000 Receitas',
                  description: 'Navegue por receitas brasileiras deliciosas, rápidas e testadas'
                },
                {
                  step: '4',
                  title: 'Planeje Sua Semana',
                  description: 'Monte o cardápio semanal arrastando receitas para cada dia'
                },
                {
                  step: '5',
                  title: 'Gere Sua Lista de Compras',
                  description: 'Com um clique, tenha todos os ingredientes organizados para ir ao mercado'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FF8A42] text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{item.title}</h3>
                    <p className="text-[#4A4A4A]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white px-8 py-6 text-lg shadow-xl rounded-[14px] h-[56px]"
                onClick={() => window.location.href = '/quiz'}
              >
                Começar Meu Quiz Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-[#3BB273]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3BB273] mb-12">
              O Que Você Vai Conquistar
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Economize até R$ 400/mês no mercado',
                'Ganhe 5+ horas por semana',
                'Acabe com o desperdício de alimentos',
                'Tenha refeições mais saudáveis',
                'Surpreenda sua família com novos pratos',
                'Nunca mais fique sem ideias',
                'Organize suas compras de uma vez',
                'Reduza pedidos de delivery'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md">
                  <Check className="w-6 h-6 text-[#3BB273] flex-shrink-0" />
                  <span className="text-[#4A4A4A] font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3BB273] mb-12">
              Veja o Que Nossos Usuários Dizem
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Mariana Silva',
                  location: 'São Paulo, SP',
                  text: 'Economizei R$ 350 no primeiro mês! Não jogo mais comida fora e minha família adora as receitas novas.',
                  rating: 5
                },
                {
                  name: 'Carlos Mendes',
                  location: 'Rio de Janeiro, RJ',
                  text: 'Antes eu passava 1h todo dia pensando no que fazer. Agora planejo tudo em 5 minutos no domingo.',
                  rating: 5
                },
                {
                  name: 'Juliana Costa',
                  location: 'Belo Horizonte, MG',
                  text: 'As receitas são INCRÍVEIS! Fáceis, rápidas e com ingredientes que eu já tenho em casa. Amei!',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#FAF9F6] p-6 rounded-xl shadow-lg">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F4D06F] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#4A4A4A] mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-[#4A4A4A]">{testimonial.name}</p>
                    <p className="text-sm text-[#4A4A4A]/70">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#3BB273] py-16 md:py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Pronto Para Transformar Suas Refeições?
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Responda nosso quiz gratuito e descubra como o Easy Meal pode mudar sua rotina na cozinha
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#3BB273] hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-2xl rounded-[14px] h-[56px]"
              onClick={() => window.location.href = '/quiz'}
            >
              Começar Meu Quiz Grátis Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm opacity-75">
              ✓ Sem cartão de crédito necessário para o quiz<br />
              ✓ Resultado personalizado em 2 minutos<br />
              ✓ Mais de 10.000 pessoas já começaram
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A4A4A] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-6 h-6" />
            <span className="font-bold text-lg">Easy Meal</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Easy Meal. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
