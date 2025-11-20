// Types para o Easy Meal

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // em minutos
  cookTime: number; // em minutos
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  tags: RecipeTag[];
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type RecipeTag = 
  | 'vegan' 
  | 'vegetarian' 
  | 'gluten-free' 
  | 'lactose-free' 
  | 'low-carb' 
  | 'quick' 
  | 'budget-friendly'
  | 'dessert'
  | 'savory'
  | 'brazilian'
  | 'international';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string; // xícara, colher, kg, g, ml, etc
}

export interface MealSlot {
  id: string;
  day: DayOfWeek;
  mealType: MealType;
  recipeId?: string;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface WeeklyPlanner {
  id: string;
  userId: string;
  weekStart: Date;
  meals: MealSlot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem {
  id: string;
  ingredient: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category?: string; // frutas, verduras, carnes, etc
}

export interface ShoppingList {
  id: string;
  userId: string;
  plannerId: string;
  items: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: 'free' | 'monthly' | 'annual';
  subscriptionExpiry?: Date;
  createdAt: Date;
}

export interface RecipeFilter {
  tags?: RecipeTag[];
  maxPrepTime?: number;
  difficulty?: ('easy' | 'medium' | 'hard')[];
  category?: ('breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert')[];
  ingredients?: string[]; // ingredientes que o usuário tem
  search?: string;
}

export interface CompletedRecipe {
  id: string;
  userId: string;
  recipeId: string;
  completedAt: Date;
  ingredientsUsed: Ingredient[];
}

export interface VirtualPantry {
  id: string;
  userId: string;
  items: PantryItem[];
  updatedAt: Date;
}

export interface PantryItem {
  ingredient: string;
  quantity: number;
  unit: string;
  lastRestocked: Date;
}
