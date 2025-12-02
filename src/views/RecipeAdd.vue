<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRecipe } from '@/composables/useRecipe';
import RecipeForm from '@/components/RecipeForm/RecipeForm.vue';

const router = useRouter();
const { addRecipe } = useRecipe();

function handleSave(newRecipe) {
  const id = Date.now();
  addRecipe({ ...newRecipe, id });
  router.push(`/recipes/${id}`);
}
function handleClose() {
  router.push('/recipes');
}
</script>

<template>
  <div class="recipe-add-view">
    <h1>Rezept anlegen</h1>
    <RecipeForm @save="handleSave" @close="handleClose" />
  </div>
</template>

<style scoped>
.recipe-add-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
