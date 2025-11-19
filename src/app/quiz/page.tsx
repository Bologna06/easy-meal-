'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChefHat, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string;
}

const QUESTIONS = [
  {
    id: 1,
    question: 'Quantas pessoas moram na sua casa?',
    options: [
      { value: '1', label: 'Só eu' },
      { value: '2', label: '2 pessoas' },
      { value: '3-4', label: '3 a 4 pessoas' },
      { value: '5+', label: '5 ou mais pessoas' }
    ]
  },
  {
    id: 2,
    question: 'Como você descreveria sua rotina de preparo de refeições?',
    options: [
      { value: 'cozinho-diario', label: 'Cozinho todos os dias' },
      { value: 'alguns-dias', label: 'Cozinho alguns dias da semana' },
      { value: 'finais-semana', label: 'Só cozinho nos finais de semana' },
      { value: 'raramente', label: 'Raramente cozinho em casa' }
    ]
  },
  {
    id: 3,
    question: 'Qual é o seu nível de habilidade na cozinha?',
    options: [
      { value: 'iniciante', label: 'Iniciante - estou aprendendo' },
      { value: 'basico', label: 'Básico - sei fazer o essencial' },
      { value: 'intermediario', label: 'Intermediário - me viro bem' },
      { value: 'avancado', label: 'Avançado - adoro cozinhar' }
    ]
  },
  {
    id: 4,
    question: 'Quanto tempo você tem disponível para cozinhar durante a semana?',
    options: [
      { value: '15min', label: 'Menos de 15 minutos' },
      { value: '30min', label: '15 a 30 minutos' },
      { value: '1h', label: '30 minutos a 1 hora' },
      { value: '1h+', label: 'Mais de 1 hora' }
    ]
  },
  {
    id: 5,
    question: 'Qual é o seu principal objetivo com as refeições?',
    options: [
      { value: 'saude', label: 'Ter uma alimentação mais saudável' },
      { value: 'praticidade', label: 'Ganhar praticidade no dia a dia' },
      { value: 'economia', label: 'Economizar dinheiro' },
      { value: 'emagrecimento', label: 'Emagrecer de forma saudável' },
      { value: 'variedade', label: 'Ter mais variedade de pratos' }
    ]
  },
  {
    id: 6,
    question: 'Você tem alguma restrição alimentar ou preferência?',
    options: [
      { value: 'nenhuma', label: 'Nenhuma restrição' },
      { value: 'vegetariano', label: 'Vegetariano' },
      { value: 'vegano', label: 'Vegano' },
      { value: 'sem-gluten', label: 'Sem glúten' },
      { value: 'sem-lactose', label: 'Sem lactose' }
    ]
  },
  {
    id: 7,
    question: 'Que tipo de comida você mais gosta?',
    options: [
      { value: 'caseira-brasileira', label: 'Comida caseira brasileira' },
      { value: 'fit-saudavel', label: 'Fit e saudável' },
      { value: 'internacional', label: 'Pratos internacionais' },
      { value: 'rapida-pratica', label: 'Rápida e prática' }
    ]
  },
  {
    id: 8,
    question: 'Qual é o seu maior desafio na cozinha atualmente?',
    options: [
      { value: 'ideias', label: 'Falta de ideias do que fazer' },
      { value: 'planejamento', label: 'Não consigo planejar com antecedência' },
      { value: 'desperdicio', label: 'Jogo muita comida fora' },
      { value: 'tempo', label: 'Não tenho tempo para cozinhar' }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers,
      {
        question: QUESTIONS[currentQuestion].question,
        answer: selectedOption
      }
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Salvar respostas e redirecionar para oferta
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      window.location.href = '/oferta';
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[currentQuestion - 1];
      setSelectedOption(previousAnswer?.answer || '');
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <ChefHat className="w-10 h-10 text-[#3BB273]" />
            <span className="text-2xl font-bold text-[#4A4A4A]">Easy Meal</span>
          </div>
          <p className="text-[#4A4A4A]">
            Pergunta {currentQuestion + 1} de {QUESTIONS.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#3BB273] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-2xl rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4A4A4A] mb-8 text-center">
            {QUESTIONS[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-8">
            {QUESTIONS[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedOption(option.value)}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
                  selectedOption === option.value
                    ? 'border-[#3BB273] bg-[#3BB273]/10 shadow-lg'
                    : 'border-gray-200 hover:border-[#3BB273]/50 hover:bg-[#3BB273]/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option.value
                      ? 'border-[#3BB273] bg-[#3BB273]'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === option.value && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-lg text-[#4A4A4A] font-medium">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                className="flex-1 rounded-[14px] h-[56px]"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex-1 bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white rounded-[14px] h-[56px] ${
                !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLastQuestion ? 'Ver Meu Plano' : 'Próxima'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-[#4A4A4A]">
            🔒 Suas respostas são 100% confidenciais
          </p>
          <p className="text-sm text-[#4A4A4A]">
            ⚡ Mais de 10.000 pessoas já fizeram este quiz
          </p>
        </div>
      </div>
    </div>
  );
}
