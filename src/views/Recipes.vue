<script setup lang="ts">
import RecipeList from '@/components/RecipeList/RecipeList.vue';
</script>

<template>
  <div class="recipes-view">
    <h1>Recipes</h1>
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
