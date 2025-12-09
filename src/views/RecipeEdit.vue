<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useRecipe } from '@/composables/useRecipe';
import RecipeForm from '@/components/RecipeForm/RecipeForm.vue';

const route = useRoute();
const router = useRouter();
const { recipes, updateRecipe } = useRecipe();

const recipeId = Number(route.params.id);
const recipe = ref(recipes.value.find(r => r.id === recipeId));

function handleSave(updated) {
  updateRecipe(updated);
  router.push(`/recipes/${recipeId}`);
}
function handleClose() {
  router.push(`/recipes/${recipeId}`);
}
</script>

<template>
  <div class="recipe-edit-view">
    <h1>Edit Recipe</h1>
    <RecipeForm v-if="recipe" :recipe="recipe" @save="handleSave" @close="handleClose" />
    <div v-else>Recipe not found.</div>
  </div>
</template>

<style scoped>
.recipe-edit-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
