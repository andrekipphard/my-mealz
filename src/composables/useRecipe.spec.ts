import { describe, it, expect, beforeEach } from 'vitest';
import { useRecipe } from '@/composables/useRecipe';
import type { Recipe } from '@/types/recipe';

const sampleRecipe: Recipe = {
  id: 1,
  name: 'Test Recipe',
  instructions: 'Test instructions',
  ingredients: [],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('useRecipe composable', () => {
  let recipeApi: ReturnType<typeof useRecipe>;

  beforeEach(() => {
    recipeApi = useRecipe();
    recipeApi.setRecipes([]); // reset state
  });


  it('adds a recipe', () => {
    recipeApi.addRecipe(sampleRecipe);
    expect(recipeApi.recipes.value.length).toBe(1);
    expect(recipeApi.recipes.value[0].name).toBe('Test Recipe');
  });

  it('gets all recipes with getRecipes', () => {
    recipeApi.addRecipe(sampleRecipe);
    const all = recipeApi.getRecipes();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(1);
    expect(all[0].id).toBe(sampleRecipe.id);
  });

  it('gets a recipe by id', () => {
    recipeApi.addRecipe(sampleRecipe);
    const found = recipeApi.getRecipeById(1);
    expect(found).not.toBeNull();
    expect(found?.name).toBe('Test Recipe');
  });

  it('updates a recipe', () => {
    recipeApi.addRecipe(sampleRecipe);
    recipeApi.updateRecipe({ ...sampleRecipe, name: 'Updated' });
    expect(recipeApi.recipes.value[0].name).toBe('Updated');
  });

  it('deletes a recipe', () => {
    recipeApi.addRecipe(sampleRecipe);
    window.confirm = () => true;
    recipeApi.deleteRecipe(1);
    expect(recipeApi.recipes.value.length).toBe(0);
  });
});
