import { ref } from 'vue';
import type { Recipe } from '@/types/recipe';
import { api } from '@/services/api';

export const recipes = ref<Recipe[]>([]);
const isLoaded = ref(false);

async function loadRecipes() {
  recipes.value = await api.getAllRecipes();
  isLoaded.value = true;
}

export function useRecipe() {
  if (!isLoaded.value) {
    loadRecipes();
  }

  async function getRecipes() {
    if (!isLoaded.value) await loadRecipes();
    return recipes.value;
  }


  async function getRecipeById(id: number) {
    return await api.getRecipeById(id);
  }


  async function addRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) {
    const newRecipe = await api.addRecipe(recipe);
    await loadRecipes();
    return newRecipe.id;
  }


  async function updateRecipe(recipe: Recipe) {
    await api.updateRecipe(recipe);
    await loadRecipes();
  }


  async function deleteRecipe(id: number) {
    await api.deleteRecipe(id);
    await loadRecipes();
  }

  function setRecipes(newRecipes: Recipe[]) {
    recipes.value = newRecipes;
  }

  return {
    recipes,
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    setRecipes,
    loadRecipes,
  };
}
