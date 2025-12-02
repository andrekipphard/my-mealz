import { ref } from 'vue';
import type { Recipe } from '@/types/recipe';

// Dummy state for now, will be replaced with DB logic
const recipes = ref<Recipe[]>([]);

export function useRecipe() {
  // Get all recipes
  function getRecipes() {
    return recipes.value;
  }

  // Get recipe by id
  function getRecipeById(id: number) {
    return recipes.value.find((r) => r.id === id) || null;
  }

  // Add a new recipe
  function addRecipe(recipe: Recipe) {
    recipes.value.push(recipe);
  }

  // Update a recipe
  function updateRecipe(updated: Recipe) {
    const idx = recipes.value.findIndex((r) => r.id === updated.id);
    if (idx !== -1) recipes.value[idx] = updated;
  }

  // Delete a recipe with confirmation
  function deleteRecipe(id: number) {
    if (window.confirm('Do you really want to delete this recipe?')) {
      recipes.value = recipes.value.filter((r) => r.id !== id);
    }
  }

  // For testing: set all recipes
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
  };
}
