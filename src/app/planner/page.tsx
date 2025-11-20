'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Plus, Trash2, ShoppingCart, Calendar } from 'lucide-react';
import { FULL_RECIPES_DATABASE } from '@/lib/recipes-data';
import { MealSlot, DayOfWeek, MealType } from '@/lib/types';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PlannerPage() {
  const [meals, setMeals] = useState<MealSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);

  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'monday', label: 'Segunda' },
    { key: 'tuesday', label: 'Terça' },
    { key: 'wednesday', label: 'Quarta' },
    { key: 'thursday', label: 'Quinta' },
    { key: 'friday', label: 'Sexta' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  const mealTypes: { key: MealType; label: string; color: string }[] = [
    { key: 'breakfast', label: 'Café da Manhã', color: 'bg-yellow-100 border-yellow-300' },
    { key: 'lunch', label: 'Almoço', color: 'bg-orange-100 border-orange-300' },
    { key: 'dinner', label: 'Jantar', color: 'bg-blue-100 border-blue-300' },
    { key: 'snack', label: 'Lanche', color: 'bg-green-100 border-green-300' },
  ];

  const getMeal = (day: DayOfWeek, mealType: MealType) => {
    return meals.find(m => m.day === day && m.mealType === mealType);
  };

  const addMealToSlot = (recipeId: string) => {
    if (!selectedSlot) return;

    const existingMealIndex = meals.findIndex(
      m => m.day === selectedSlot.day && m.mealType === selectedSlot.mealType
    );

    if (existingMealIndex >= 0) {
      // Substituir refeição existente
      const newMeals = [...meals];
      newMeals[existingMealIndex] = {
        ...newMeals[existingMealIndex],
        recipeId
      };
      setMeals(newMeals);
    } else {
      // Adicionar nova refeição
      setMeals([
        ...meals,
        {
          id: `${selectedSlot.day}-${selectedSlot.mealType}-${Date.now()}`,
          day: selectedSlot.day,
          mealType: selectedSlot.mealType,
          recipeId
        }
      ]);
    }

    setSelectedSlot(null);
  };

  const removeMeal = (day: DayOfWeek, mealType: MealType) => {
    setMeals(meals.filter(m => !(m.day === day && m.mealType === mealType)));
  };

  const getRecipe = (recipeId: string) => {
    return FULL_RECIPES_DATABASE.find(r => r.id === recipeId);
  };

  const generateShoppingList = () => {
    // Redirecionar para página de lista de compras com os dados do planner
    const recipeIds = meals.map(m => m.recipeId).filter(Boolean);
    const queryString = recipeIds.join(',');
    window.location.href = `/lista-compras?recipes=${queryString}`;
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
            <nav className="flex gap-4">
              <Link href="/receitas">
                <Button variant="ghost">Receitas</Button>
              </Link>
              <Button
                onClick={generateShoppingList}
                className="bg-[#FF8A42] hover:bg-[#FF8A42]/90"
                disabled={meals.length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Gerar Lista de Compras
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#4A4A4A] mb-2 flex items-center gap-3">
            <Calendar className="w-10 h-10 text-[#3BB273]" />
            Planner Semanal
          </h1>
          <p className="text-lg text-[#4A4A4A]/70">
            Organize suas refeições da semana e gere sua lista de compras automaticamente
          </p>
        </div>

        {/* Grid do Planner */}
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Header dos dias */}
            <div className="grid grid-cols-8 gap-4 mb-4">
              <div className="font-bold text-[#4A4A4A]">Refeição</div>
              {days.map(day => (
                <div key={day.key} className="text-center font-bold text-[#4A4A4A]">
                  {day.label}
                </div>
              ))}
            </div>

            {/* Linhas de refeições */}
            {mealTypes.map(mealType => (
              <div key={mealType.key} className="grid grid-cols-8 gap-4 mb-4">
                <div className="flex items-center">
                  <Badge className="bg-[#3BB273]">{mealType.label}</Badge>
                </div>

                {days.map(day => {
                  const meal = getMeal(day.key, mealType.key);
                  const recipe = meal?.recipeId ? getRecipe(meal.recipeId) : null;

                  return (
                    <Dialog key={`${day.key}-${mealType.key}`}>
                      <DialogTrigger asChild>
                        <Card
                          className={`cursor-pointer hover:shadow-lg transition-all border-2 ${mealType.color} ${
                            recipe ? 'border-[#3BB273]' : ''
                          }`}
                          onClick={() => setSelectedSlot({ day: day.key, mealType: mealType.key })}
                        >
                          <CardContent className="p-4 min-h-[120px] flex flex-col justify-between">
                            {recipe ? (
                              <>
                                <div>
                                  <p className="font-semibold text-sm text-[#4A4A4A] mb-1 line-clamp-2">
                                    {recipe.title}
                                  </p>
                                  <p className="text-xs text-[#4A4A4A]/70">
                                    {recipe.prepTime + recipe.cookTime} min
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="w-full mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMeal(day.key, mealType.key);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-full text-[#4A4A4A]/40">
                                <Plus className="w-6 h-6" />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>
                            Escolha uma receita para {mealType.label} - {day.label}
                          </DialogTitle>
                          <DialogDescription>
                            Selecione uma receita da lista abaixo
                          </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="h-[500px] pr-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            {FULL_RECIPES_DATABASE.slice(0, 50).map(recipe => (
                              <Card
                                key={recipe.id}
                                className="cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => addMealToSlot(recipe.id)}
                              >
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <CardHeader className="p-4">
                                  <CardTitle className="text-sm">{recipe.title}</CardTitle>
                                  <p className="text-xs text-[#4A4A4A]/70">
                                    {recipe.prepTime + recipe.cookTime} min • {recipe.servings} porções
                                  </p>
                                </CardHeader>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <Card className="mt-8 bg-[#3BB273]/10 border-[#3BB273]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#4A4A4A] mb-2">💡 Dicas para usar o Planner:</h3>
            <ul className="space-y-1 text-[#4A4A4A]/80">
              <li>• Clique em qualquer slot para adicionar uma receita</li>
              <li>• Planeje com antecedência para economizar tempo durante a semana</li>
              <li>• Após preencher, clique em "Gerar Lista de Compras" para ter todos os ingredientes</li>
              <li>• Você pode substituir receitas clicando novamente no slot</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
