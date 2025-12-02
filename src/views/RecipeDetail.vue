<template>
  <div class="recipe-detail">
    <router-link to="/recipes">Back to list</router-link>
    <Recipe v-if="recipe" :recipe="recipe" />
    <div v-else class="not-found">Recipe not found.</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useRecipe } from '@/composables/useRecipe';
import Recipe from '@/components/Recipe/Recipe.vue';

const route = useRoute();
const { getRecipeById } = useRecipe();
const recipe = computed(() => getRecipeById(Number(route.params.id)));
</script>

<style scoped>
.recipe-detail {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
}
.not-found {
  color: #e57373;
  font-weight: bold;
  margin-top: 2rem;
}
</style>
