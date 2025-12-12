
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRecipe } from '@/composables/useRecipe';
import * as api from '@/services/api';
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
    vi.resetAllMocks();
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([]);
    vi.spyOn(api.api, 'getRecipeById').mockResolvedValue(null);
    vi.spyOn(api.api, 'addRecipe').mockResolvedValue(sampleRecipe);
    vi.spyOn(api.api, 'updateRecipe').mockResolvedValue(sampleRecipe);
    vi.spyOn(api.api, 'deleteRecipe').mockResolvedValue();
    recipeApi = useRecipe();
  });

  it('adds a recipe', async () => {
    vi.spyOn(api.api, 'addRecipe').mockResolvedValue(sampleRecipe);
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([sampleRecipe]);
    await recipeApi.addRecipe(sampleRecipe);
    expect(recipeApi.recipes.value.length).toBe(1);
    expect(recipeApi.recipes.value[0].name).toBe('Test Recipe');
  });

  it('gets all recipes with getRecipes', async () => {
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([sampleRecipe]);
    await recipeApi.loadRecipes();
    const all = await recipeApi.getRecipes();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(1);
    expect(all[0].id).toBe(sampleRecipe.id);
  });

  it('gets a recipe by id', async () => {
    vi.spyOn(api.api, 'getRecipeById').mockResolvedValue(sampleRecipe);
    const found = await recipeApi.getRecipeById(1);
    expect(found).not.toBeNull();
    expect(found?.name).toBe('Test Recipe');
  });

  it('updates a recipe', async () => {
    const updatedRecipe = { ...sampleRecipe, name: 'Updated' };
    vi.spyOn(api.api, 'updateRecipe').mockResolvedValue(updatedRecipe);
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([updatedRecipe]);
    await recipeApi.updateRecipe(updatedRecipe);
    expect(recipeApi.recipes.value[0].name).toBe('Updated');
  });

  it('deletes a recipe', async () => {
    vi.spyOn(api.api, 'deleteRecipe').mockResolvedValue();
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([]);
    await recipeApi.deleteRecipe(1);
    expect(recipeApi.recipes.value.length).toBe(0);
  });
});
