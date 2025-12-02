<template>
  <div class="recipe-list">
    <div class="recipe-list__header">
      <h2>Recipes</h2>
      <router-link to="/recipes/add" class="add-recipe-link">
        <button type="button" class="add-recipe-btn">
          <span aria-hidden="true">＋</span> Add Recipe
        </button>
      </router-link>
    </div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <RecipeListItem :recipe="recipe" @delete="onDeleteById" />
      </li>
    </ul>
    <div v-if="!recipes.length" class="recipe-list__empty">No recipes found.</div>
  </div>
</template>

<script setup lang="ts">
import { useRecipe } from '@/composables/useRecipe';
import RecipeListItem from './RecipeListItem/RecipeListItem.vue';
const { recipes, deleteRecipe } = useRecipe();

function onDeleteById(id) {
  deleteRecipe(id);
}
</script>

<style scoped src="./RecipeList.scss"></style>