import type { Recipe } from '@/types/recipe';

export const testRecipe: Recipe = {
  id: 1,
  name: 'Pasta Aglio e Olio',
  description: 'Simple Italian pasta with garlic and olive oil.',
  instructions: `1. Cook pasta according to package instructions\n2. Slice garlic thinly\n3. Heat olive oil in a pan\n4. Fry garlic until golden\n5. Add cooked pasta\n6. Season with salt and pepper\n7. Serve with parmesan`,
  ingredients: [
    { name: 'Spaghetti', amount: 200, unit: 'g' },
    { name: 'Garlic cloves', amount: 2, unit: 'pcs' },
    { name: 'Olive oil', amount: 40, unit: 'ml' },
    { name: 'Parsley', amount: 1, unit: 'tbsp', optional: true },
    { name: 'Salt', amount: 1, unit: 'pinch' },
    { name: 'Pepper', amount: 1, unit: 'pinch' },
    { name: 'Parmesan', amount: 30, unit: 'g', optional: true },
  ],
  prep_time: 10,
  cook_time: 15,
  servings: 2,
  difficulty: 'easy',
  category: 'Italian',
  tags: ['Pasta', 'Vegetarian', 'Quick'],
  image_url:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  last_cooked: new Date(),
  favorite: true,
  rating: 5,
  created_at: new Date(),
  updated_at: new Date(),
};

export const testRecipe2: Recipe = {
  id: 2,
  name: 'Classic Tomato Soup',
  description: 'A creamy, comforting tomato soup with a hint of basil.',
  instructions: `1. Sauté onions and garlic\n2. Add tomatoes and broth\n3. Simmer 20 min\n4. Blend until smooth\n5. Stir in cream and basil`,
  ingredients: [
    { name: 'Tomatoes', amount: 800, unit: 'g' },
    { name: 'Onion', amount: 1, unit: 'pcs' },
    { name: 'Garlic', amount: 2, unit: 'cloves' },
    { name: 'Vegetable broth', amount: 500, unit: 'ml' },
    { name: 'Cream', amount: 100, unit: 'ml', optional: true },
    { name: 'Basil', amount: 1, unit: 'tbsp', optional: true },
    { name: 'Salt', amount: 1, unit: 'tsp' },
    { name: 'Pepper', amount: 0.5, unit: 'tsp' },
  ],
  prep_time: 10,
  cook_time: 30,
  servings: 4,
  difficulty: 'easy',
  category: 'Soup',
  tags: ['Soup', 'Vegetarian', 'Comfort Food'],
  image_url:
    'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
  last_cooked: new Date(),
  favorite: false,
  rating: 4,
  created_at: new Date(),
  updated_at: new Date(),
};

export const testRecipe3: Recipe = {
  id: 3,
  name: 'Chicken Caesar Salad',
  description: 'Crisp romaine, grilled chicken, parmesan, and croutons with Caesar dressing.',
  instructions: `1. Grill chicken\n2. Toss lettuce with dressing\n3. Add chicken, croutons, parmesan\n4. Serve immediately`,
  ingredients: [
    { name: 'Chicken breast', amount: 2, unit: 'pcs' },
    { name: 'Romaine lettuce', amount: 1, unit: 'head' },
    { name: 'Parmesan', amount: 30, unit: 'g' },
    { name: 'Croutons', amount: 50, unit: 'g' },
    { name: 'Caesar dressing', amount: 60, unit: 'ml' },
    { name: 'Olive oil', amount: 1, unit: 'tbsp' },
    { name: 'Salt', amount: 1, unit: 'pinch' },
    { name: 'Pepper', amount: 1, unit: 'pinch' },
  ],
  prep_time: 15,
  cook_time: 10,
  servings: 2,
  difficulty: 'medium',
  category: 'Salad',
  tags: ['Salad', 'Chicken', 'Quick'],
  image_url:
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
  last_cooked: new Date(),
  favorite: false,
  rating: 5,
  created_at: new Date(),
  updated_at: new Date(),
};

export const testRecipes: Recipe[] = [testRecipe, testRecipe2, testRecipe3];
