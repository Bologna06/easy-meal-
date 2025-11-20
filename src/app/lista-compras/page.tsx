'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChefHat, ShoppingCart, Download, Share2, Plus, Trash2, Check } from 'lucide-react';
import { FULL_RECIPES_DATABASE } from '@/lib/recipes-data';
import { ShoppingListItem } from '@/lib/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ListaComprasPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');

  useEffect(() => {
    // Gerar lista de compras baseada nas receitas do planner
    const recipeIds = searchParams.get('recipes')?.split(',') || [];
    
    if (recipeIds.length > 0) {
      const ingredientsMap = new Map<string, { quantity: number; unit: string; category: string }>();

      recipeIds.forEach(recipeId => {
        const recipe = FULL_RECIPES_DATABASE.find(r => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const key = ingredient.name.toLowerCase();
            const existing = ingredientsMap.get(key);

            if (existing && existing.unit === ingredient.unit) {
              // Somar quantidades se a unidade for a mesma
              ingredientsMap.set(key, {
                quantity: existing.quantity + ingredient.quantity,
                unit: ingredient.unit,
                category: categorizeIngredient(ingredient.name)
              });
            } else {
              // Adicionar novo ingrediente
              ingredientsMap.set(key, {
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                category: categorizeIngredient(ingredient.name)
              });
            }
          });
        }
      });

      // Converter para array de ShoppingListItem
      const generatedItems: ShoppingListItem[] = Array.from(ingredientsMap.entries()).map(
        ([name, data], index) => ({
          id: `${index}`,
          ingredient: name,
          quantity: data.quantity,
          unit: data.unit,
          checked: false,
          category: data.category
        })
      );

      setItems(generatedItems);
    }
  }, [searchParams]);

  const categorizeIngredient = (name: string): string => {
    const lowerName = name.toLowerCase();
    
    if (['tomate', 'cebola', 'alho', 'pimentão', 'cenoura', 'batata', 'mandioca'].some(v => lowerName.includes(v))) {
      return 'Legumes e Verduras';
    }
    if (['frango', 'carne', 'peixe', 'bacon', 'linguiça', 'costela'].some(v => lowerName.includes(v))) {
      return 'Carnes';
    }
    if (['leite', 'queijo', 'manteiga', 'iogurte', 'creme'].some(v => lowerName.includes(v))) {
      return 'Laticínios';
    }
    if (['arroz', 'feijão', 'macarrão', 'farinha', 'açúcar', 'sal'].some(v => lowerName.includes(v))) {
      return 'Mercearia';
    }
    if (['banana', 'maçã', 'laranja', 'limão', 'abacaxi'].some(v => lowerName.includes(v))) {
      return 'Frutas';
    }
    
    return 'Outros';
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addCustomItem = () => {
    if (!newItem.trim()) return;

    const newShoppingItem: ShoppingListItem = {
      id: `custom-${Date.now()}`,
      ingredient: newItem,
      quantity: parseFloat(newQuantity) || 1,
      unit: newUnit || 'unidade',
      checked: false,
      category: categorizeIngredient(newItem)
    };

    setItems([...items, newShoppingItem]);
    setNewItem('');
    setNewQuantity('');
    setNewUnit('');
  };

  const exportList = () => {
    const text = items
      .map(item => `${item.checked ? '✓' : '☐'} ${item.quantity} ${item.unit} de ${item.ingredient}`)
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-de-compras.txt';
    a.click();
  };

  const shareList = async () => {
    const text = items
      .map(item => `${item.quantity} ${item.unit} de ${item.ingredient}`)
      .join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Lista de Compras - Easy Meal',
          text: text
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(text);
      alert('Lista copiada para a área de transferência!');
    }
  };

  // Agrupar itens por categoria
  const itemsByCategory = useMemo(() => {
    const grouped = new Map<string, ShoppingListItem[]>();
    
    items.forEach(item => {
      const category = item.category || 'Outros';
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(item);
    });

    return grouped;
  }, [items]);

  const checkedCount = items.filter(i => i.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

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
              <Link href="/planner">
                <Button variant="ghost">Planner</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#4A4A4A] mb-2 flex items-center gap-3">
            <ShoppingCart className="w-10 h-10 text-[#3BB273]" />
            Lista de Compras
          </h1>
          <p className="text-lg text-[#4A4A4A]/70">
            {totalCount} itens • {checkedCount} marcados
          </p>
        </div>

        {/* Progresso */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#4A4A4A]">Progresso das Compras</span>
              <span className="text-sm font-medium text-[#4A4A4A]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#3BB273] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Compras */}
          <div className="lg:col-span-2 space-y-6">
            {Array.from(itemsByCategory.entries()).map(([category, categoryItems]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-xl text-[#4A4A4A] flex items-center justify-between">
                    {category}
                    <Badge variant="secondary">{categoryItems.length} itens</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          item.checked
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white border-gray-200 hover:border-[#3BB273]'
                        }`}
                      >
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${item.checked ? 'line-through text-gray-400' : 'text-[#4A4A4A]'}`}>
                            {item.quantity} {item.unit} de {item.ingredient}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {items.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-[#4A4A4A]/70 mb-4">
                    Sua lista está vazia
                  </p>
                  <Link href="/planner">
                    <Button className="bg-[#3BB273] hover:bg-[#3BB273]/90">
                      Ir para o Planner
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Ações */}
          <div className="space-y-6">
            {/* Adicionar Item Customizado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4A4A4A]">Adicionar Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Nome do item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                  />
                  <Input
                    placeholder="Unidade"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                  />
                </div>
                <Button
                  onClick={addCustomItem}
                  className="w-full bg-[#3BB273] hover:bg-[#3BB273]/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardContent>
            </Card>

            {/* Ações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4A4A4A]">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={exportList}
                  variant="outline"
                  className="w-full"
                  disabled={items.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Lista
                </Button>
                <Button
                  onClick={shareList}
                  variant="outline"
                  className="w-full"
                  disabled={items.length === 0}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </CardContent>
            </Card>

            {/* Dicas */}
            <Card className="bg-[#3BB273]/10 border-[#3BB273]">
              <CardContent className="p-4">
                <h3 className="font-bold text-[#4A4A4A] mb-2 text-sm">💡 Dicas:</h3>
                <ul className="space-y-1 text-xs text-[#4A4A4A]/80">
                  <li>• Marque os itens conforme compra</li>
                  <li>• Adicione itens extras manualmente</li>
                  <li>• Exporte para levar ao mercado</li>
                  <li>• Compartilhe com familiares</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
