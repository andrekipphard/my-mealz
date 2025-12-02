<script setup lang="ts">
import RecipeList from '@/components/RecipeList/RecipeList.vue';
import { testRecipes } from '@/mocks/recipes';
import { useRecipe } from '@/composables/useRecipe';

const { setRecipes } = useRecipe();
setRecipes(testRecipes);
</script>

<template>
  <div class="recipes-view">
    <h1>Rezepte</h1>
    <RecipeList />
  </div>
</template>

<style scoped>
.recipes-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
