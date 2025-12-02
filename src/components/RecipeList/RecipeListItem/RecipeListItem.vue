<script setup lang="ts">
import type { Recipe } from '@/types/recipe';
import { useRecipe } from '@/composables/useRecipe';
const props = defineProps<{ recipe: Recipe }>();
const { deleteRecipe } = useRecipe();

function onDelete() {
  deleteRecipe(props.recipe.id);
}
</script>

<template>
  <div class="recipe-list__item">
    <img
      v-if="recipe.image_url"
      :src="recipe.image_url"
      :alt="recipe.name"
      class="recipe-list__img"
    />
    <div class="recipe-list__info">
      <h3>{{ recipe.name }}</h3>
      <p>{{ recipe.description }}</p>
      <small>{{ recipe.category }}</small>
    </div>
    <div class="recipe-list__actions">
      <router-link :to="`/recipes/${recipe.id}`">
        <button type="button">View</button>
      </router-link>
      <button type="button" data-testid="delete-btn" @click="onDelete">Delete</button>
    </div>
  </div>
</template>

<style scoped src="./RecipeListItem.scss"></style>
