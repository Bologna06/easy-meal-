'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Clock, Users, ChefHat, Filter, X } from 'lucide-react';
import { FULL_RECIPES_DATABASE } from '@/lib/recipes-data';
import { Recipe, RecipeTag } from '@/lib/types';
import Link from 'next/link';

export default function ReceitasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtrar receitas
  const filteredRecipes = useMemo(() => {
    return FULL_RECIPES_DATABASE.filter(recipe => {
      // Filtro de busca
      if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro de tags
      if (selectedTags.length > 0 && !selectedTags.some(tag => recipe.tags.includes(tag))) {
        return false;
      }

      // Filtro de tempo
      if (maxPrepTime && (recipe.prepTime + recipe.cookTime) > maxPrepTime) {
        return false;
      }

      // Filtro de dificuldade
      if (selectedDifficulty !== 'all' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // Filtro de categoria
      if (selectedCategory !== 'all' && recipe.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedTags, maxPrepTime, selectedDifficulty, selectedCategory]);

  const toggleTag = (tag: RecipeTag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setMaxPrepTime(null);
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  const availableTags: RecipeTag[] = [
    'vegan', 'vegetarian', 'gluten-free', 'lactose-free', 
    'low-carb', 'quick', 'budget-friendly', 'dessert', 
    'savory', 'brazilian', 'international'
  ];

  const tagLabels: Record<RecipeTag, string> = {
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

  const categoryLabels = {
    'breakfast': 'Café da Manhã',
    'lunch': 'Almoço',
    'dinner': 'Jantar',
    'snack': 'Lanche',
    'dessert': 'Sobremesa'
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
              <Link href="/planner">
                <Button variant="ghost">Planner</Button>
              </Link>
              <Link href="/lista-compras">
                <Button variant="ghost">Lista de Compras</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#4A4A4A] mb-2">
            Descubra Receitas Incríveis
          </h1>
          <p className="text-lg text-[#4A4A4A]/70">
            {filteredRecipes.length} receitas encontradas
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#4A4A4A] flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </h2>
            {(searchTerm || selectedTags.length > 0 || maxPrepTime || selectedDifficulty !== 'all' || selectedCategory !== 'all') && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </div>

          {/* Busca */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros em Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Tempo Máximo */}
            <div>
              <label className="text-sm font-medium text-[#4A4A4A] mb-2 block">
                Tempo Máximo
              </label>
              <Select value={maxPrepTime?.toString() || 'all'} onValueChange={(v) => setMaxPrepTime(v === 'all' ? null : parseInt(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer tempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer tempo</SelectItem>
                  <SelectItem value="15">Até 15 min</SelectItem>
                  <SelectItem value="30">Até 30 min</SelectItem>
                  <SelectItem value="60">Até 1 hora</SelectItem>
                  <SelectItem value="120">Até 2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dificuldade */}
            <div>
              <label className="text-sm font-medium text-[#4A4A4A] mb-2 block">
                Dificuldade
              </label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categoria */}
            <div>
              <label className="text-sm font-medium text-[#4A4A4A] mb-2 block">
                Categoria
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="breakfast">Café da Manhã</SelectItem>
                  <SelectItem value="lunch">Almoço</SelectItem>
                  <SelectItem value="dinner">Jantar</SelectItem>
                  <SelectItem value="snack">Lanche</SelectItem>
                  <SelectItem value="dessert">Sobremesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-[#4A4A4A] mb-2 block">
              Preferências Alimentares
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag) 
                      ? 'bg-[#3BB273] hover:bg-[#3BB273]/90' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tagLabels[tag]}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Receitas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <Card key={recipe.id} className="hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-white/90 text-[#4A4A4A]">
                  {difficultyLabels[recipe.difficulty]}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-[#4A4A4A]">{recipe.title}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-sm text-[#4A4A4A]/70 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime + recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} porções</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tagLabels[tag]}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link href={`/receitas/${recipe.id}`} className="w-full">
                  <Button className="w-full bg-[#FF8A42] hover:bg-[#FF8A42]/90">
                    Ver Receita
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#4A4A4A]/70">
              Nenhuma receita encontrada com esses filtros.
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
