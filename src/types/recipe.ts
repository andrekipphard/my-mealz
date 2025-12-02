import type { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  name: string;
  description?: string;
  instructions: string;
  ingredients: Ingredient[];
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  tags?: string[];
  image_url?: string;
  last_cooked?: Date;
  favorite?: boolean;
  rating?: number;
  created_at: Date;
  updated_at: Date;
}
