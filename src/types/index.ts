// Basis-Interface für alle Entitäten mit ID
export interface BaseEntity {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

// Rezept Interface
export interface Recipe extends BaseEntity {
  name: string;
  description?: string;
  instructions: string;
  prep_time?: number; // in Minuten
  cook_time?: number; // in Minuten
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  tags?: string[];
  image_url?: string;
  last_cooked?: Date;
  favorite?: boolean;
  rating?: number; // 1-5
}

// Zutat Interface
export interface Ingredient extends BaseEntity {
  name: string;
  brand?: string;
  barcode?: string;
  category?: string;
  default_unit?: string;
}

// Rezept-Zutat Verbindung
export interface RecipeIngredient extends BaseEntity {
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  unit: string;
  optional?: boolean;
}

// Kühlschrank-Item (was du tatsächlich zu Hause hast)
export interface FridgeItem extends BaseEntity {
  ingredient_id: number;
  amount: number;
  unit: string;
  expiry_date?: Date;
  purchase_date?: Date;
  location?: 'fridge' | 'freezer' | 'pantry' | 'other';
  opened?: boolean;
  opened_date?: Date;
  notes?: string;
}

// Einkaufsliste
export interface ShoppingItem extends BaseEntity {
  ingredient_id: number;
  amount: number;
  unit: string;
  priority?: 'low' | 'medium' | 'high';
  purchased?: boolean;
  notes?: string;
}

// Kochhistorie
export interface CookingHistory extends BaseEntity {
  recipe_id: number;
  cooked_at: Date;
  rating?: number;
  notes?: string;
  served_portions?: number;
}

// Nährwertangaben (optional für später)
export interface Nutrition extends BaseEntity {
  ingredient_id: number;
  calories_per_100g?: number;
  protein_per_100g?: number;
  carbs_per_100g?: number;
  fat_per_100g?: number;
  fiber_per_100g?: number;
  sugar_per_100g?: number;
}

// Recipe Suggestion Interface für die Vorschlagslogik
export interface RecipeSuggestion {
  recipe: Recipe;
  score: number;
  reason: SuggestionReason[];
  missing_ingredients: RecipeIngredient[];
  available_ingredients: RecipeIngredient[];
}

export type SuggestionReason =
  | 'has_all_ingredients'
  | 'almost_all_ingredients'
  | 'long_time_not_cooked'
  | 'ingredients_expire_soon'
  | 'favorite_recipe'
  | 'high_rated'
  | 'random';

// Database Query Optionen
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  where?: Record<string, any>;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// App Settings
export interface AppSettings extends BaseEntity {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
}
