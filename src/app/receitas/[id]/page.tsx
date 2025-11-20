'use client';

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChefHat, Clock, Users, ArrowLeft, Plus, Check } from 'lucide-react';
import { FULL_RECIPES_DATABASE } from '@/lib/recipes-data';
import Link from 'next/link';
import { useState } from 'react';

export default function ReceitaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const recipe = FULL_RECIPES_DATABASE.find(r => r.id === resolvedParams.id);
  const [addedToPlanner, setAddedToPlanner] = useState(false);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">Receita não encontrada</h1>
          <Link href="/receitas">
            <Button>Voltar para Receitas</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tagLabels: Record<string, string> = {
    'vegan': 'Vegana',
    'vegetarian': 'Vegetariana',
    'gluten-free': 'Sem Glúten',
    'lactose-free': 'Sem Lactose',
    'low-carb': 'Low-Carb',
    'quick': 'Rápida',
    'budget-friendly': 'Econômica',
    'dessert': 'Sobremesa',
    'savory': 'Salgado',
    'brazilian': 'Brasileira',
    'international': 'Internacional'
  };

  const difficultyLabels = {
    'easy': 'Fácil',
    'medium': 'Médio',
    'hard': 'Difícil'
  };

  const handleAddToPlanner = () => {
    // Aqui você implementaria a lógica de adicionar ao planner
    // Por enquanto, apenas feedback visual
    setAddedToPlanner(true);
    setTimeout(() => setAddedToPlanner(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-[#3BB273]" />
              <span className="text-xl font-bold text-[#4A4A4A]">Easy Meal</span>
            </Link>
            <Link href="/receitas">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero da Receita */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map(tag => (
                <Badge key={tag} className="bg-[#3BB273]">
                  {tagLabels[tag]}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-[#4A4A4A] mb-4">
              {recipe.title}
            </h1>

            <p className="text-lg text-[#4A4A4A]/70 mb-6">
              {recipe.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-8 h-8 text-[#FF8A42] mx-auto mb-2" />
                  <p className="text-sm text-[#4A4A4A]/70">Tempo Total</p>
                  <p className="text-xl font-bold text-[#4A4A4A]">
                    {recipe.prepTime + recipe.cookTime} min
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 text-[#FF8A42] mx-auto mb-2" />
                  <p className="text-sm text-[#4A4A4A]/70">Porções</p>
                  <p className="text-xl font-bold text-[#4A4A4A]">
                    {recipe.servings}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <ChefHat className="w-8 h-8 text-[#FF8A42] mx-auto mb-2" />
                  <p className="text-sm text-[#4A4A4A]/70">Dificuldade</p>
                  <p className="text-xl font-bold text-[#4A4A4A]">
                    {difficultyLabels[recipe.difficulty]}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="bg-[#3BB273] hover:bg-[#3BB273]/90 text-white"
              onClick={handleAddToPlanner}
            >
              {addedToPlanner ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Adicionado ao Planner!
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar ao Planner
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Ingredientes e Modo de Preparo */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ingredientes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#4A4A4A]">Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3BB273] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-[#4A4A4A]">
                      <strong>{ingredient.quantity} {ingredient.unit}</strong> de {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Modo de Preparo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#4A4A4A]">Modo de Preparo</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#FF8A42] text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-[#4A4A4A] pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Informações Nutricionais */}
        {recipe.nutrition && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-[#4A4A4A]">Informações Nutricionais (por porção)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#FAF9F6] rounded-lg">
                  <p className="text-sm text-[#4A4A4A]/70 mb-1">Calorias</p>
                  <p className="text-2xl font-bold text-[#4A4A4A]">{recipe.nutrition.calories}</p>
                  <p className="text-xs text-[#4A4A4A]/50">kcal</p>
                </div>
                <div className="text-center p-4 bg-[#FAF9F6] rounded-lg">
                  <p className="text-sm text-[#4A4A4A]/70 mb-1">Proteínas</p>
                  <p className="text-2xl font-bold text-[#4A4A4A]">{recipe.nutrition.protein}</p>
                  <p className="text-xs text-[#4A4A4A]/50">g</p>
                </div>
                <div className="text-center p-4 bg-[#FAF9F6] rounded-lg">
                  <p className="text-sm text-[#4A4A4A]/70 mb-1">Carboidratos</p>
                  <p className="text-2xl font-bold text-[#4A4A4A]">{recipe.nutrition.carbs}</p>
                  <p className="text-xs text-[#4A4A4A]/50">g</p>
                </div>
                <div className="text-center p-4 bg-[#FAF9F6] rounded-lg">
                  <p className="text-sm text-[#4A4A4A]/70 mb-1">Gorduras</p>
                  <p className="text-2xl font-bold text-[#4A4A4A]">{recipe.nutrition.fat}</p>
                  <p className="text-xs text-[#4A4A4A]/50">g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
