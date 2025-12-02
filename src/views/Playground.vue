<script setup lang="ts">
defineOptions({ name: 'PlaygroundView' });
import Recipe from '@/components/Recipe/Recipe.vue';
import RecipeList from '@/components/RecipeList/RecipeList.vue';
import { testRecipes } from '@/mocks/recipes';
import { useRecipe } from '@/composables/useRecipe';

const { recipes, setRecipes } = useRecipe();
setRecipes(testRecipes);

</script>

<template>
  <div class="playground">
    <h1>Component Test / Playground</h1>
    <h2>Recipe List</h2>
    <RecipeList />
    <Recipe v-if="recipes.length" :recipe="recipes[0]" />
  </div>
</template>

<style scoped>
.playground {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
