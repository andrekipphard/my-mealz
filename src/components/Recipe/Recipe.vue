<script setup lang="ts">
import type { Recipe } from '@/types/recipe';
import { useRecipe } from '@/composables/useRecipe';

const props = defineProps<{ recipe: Recipe }>();
const emit = defineEmits(['edit', 'delete']);
const { deleteRecipe } = useRecipe();

function onDelete() {
  deleteRecipe(props.recipe.id);
}
</script>

<template>
  <div class="recipe">
    <div class="recipe-actions">
      <router-link :to="`/recipes/${recipe.id}/edit`">
        <button>Edit</button>
      </router-link>
      <button @click="onDelete">Delete</button>
    </div>
    <h2>{{ recipe.name }}</h2>
    <p v-if="recipe.description">{{ recipe.description }}</p>
    <img v-if="recipe.image_url" :src="recipe.image_url" :alt="recipe.name" class="recipe-image" />
    <ul class="recipe-meta">
      <li v-if="recipe.category"><strong>Category:</strong> {{ recipe.category }}</li>
      <li v-if="recipe.difficulty"><strong>Difficulty:</strong> {{ recipe.difficulty }}</li>
      <li v-if="recipe.prep_time"><strong>Prep time:</strong> {{ recipe.prep_time }} min</li>
      <li v-if="recipe.cook_time"><strong>Cook time:</strong> {{ recipe.cook_time }} min</li>
      <li v-if="recipe.servings"><strong>Servings:</strong> {{ recipe.servings }}</li>
      <li v-if="recipe.tags && recipe.tags.length">
        <strong>Tags:</strong> {{ recipe.tags.join(', ') }}
      </li>
      <li v-if="recipe.favorite"><strong>Favorite</strong></li>
      <li v-if="recipe.rating"><strong>Rating:</strong> {{ recipe.rating }}/5</li>
    </ul>

    <div v-if="recipe.ingredients && recipe.ingredients.length" class="recipe-ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name
          }}<span v-if="ingredient.optional"> (optional)</span>
        </li>
      </ul>
    </div>
    <div class="recipe-instructions">
      <h3>Instructions</h3>
      <pre>{{ recipe.instructions }}</pre>
    </div>
  </div>
</template>

<style scoped src="./Recipe.scss"></style>
