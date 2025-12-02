<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { Recipe } from '@/types/recipe';

const props = defineProps<{
  recipe?: Recipe;
}>();
const emit = defineEmits(['save', 'close']);

const isEdit = computed(() => !!props.recipe);
const form = reactive<Recipe>({
  id: props.recipe?.id || Date.now(),
  name: props.recipe?.name || '',
  description: props.recipe?.description || '',
  instructions: props.recipe?.instructions || '',
  ingredients: props.recipe?.ingredients
    ? JSON.parse(JSON.stringify(props.recipe.ingredients))
    : [],
  prep_time: props.recipe?.prep_time || 0,
  cook_time: props.recipe?.cook_time || 0,
  servings: props.recipe?.servings || 1,
  difficulty: props.recipe?.difficulty || 'easy',
  category: props.recipe?.category || '',
  tags: props.recipe?.tags ? [...props.recipe.tags] : [],
  image_url: props.recipe?.image_url || '',
  last_cooked: props.recipe?.last_cooked || undefined,
  favorite: props.recipe?.favorite || false,
  rating: props.recipe?.rating || undefined,
  created_at: props.recipe?.created_at || new Date(),
  updated_at: new Date(),
});

const tagsInput = ref(form.tags.join(', '));
function updateTags() {
  form.tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function addIngredient() {
  form.ingredients.push({ name: '', amount: 0, unit: '' });
}
function removeIngredient(i: number) {
  form.ingredients.splice(i, 1);
}

function onSubmit() {
  updateTags();
  emit('save', { ...form });
}


watch(
  () => props.recipe,
  (newRecipe) => {
    if (newRecipe) {
      Object.assign(form, JSON.parse(JSON.stringify(newRecipe)));
      tagsInput.value = newRecipe.tags?.join(', ') || '';
    }
  }
);
</script>
<template>
  <form class="recipe-form" @submit.prevent="onSubmit">
    <h2>{{ isEdit ? 'Edit Recipe' : 'Add Recipe' }}</h2>
    <label>
      Name
      <input v-model="form.name" required />
    </label>
    <label>
      Description
      <textarea v-model="form.description" />
    </label>
    <label>
      Instructions
      <textarea v-model="form.instructions" required />
    </label>
    <label>
      Category
      <input v-model="form.category" />
    </label>
    <label>
      Tags (comma separated)
      <input v-model="tagsInput" @blur="updateTags" />
    </label>
    <label>
      Servings
      <input type="number" v-model.number="form.servings" min="1" />
    </label>
    <label>
      Prep time (min)
      <input type="number" v-model.number="form.prep_time" min="0" />
    </label>
    <label>
      Cook time (min)
      <input type="number" v-model.number="form.cook_time" min="0" />
    </label>
    <label>
      Difficulty
      <select v-model="form.difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </label>
    <label>
      Image URL
      <input v-model="form.image_url" />
    </label>
    <fieldset>
      <legend>Ingredients</legend>
      <div v-for="(ingredient, i) in form.ingredients" :key="i" class="ingredient-row">
        <input v-model="ingredient.name" placeholder="Name" required />
        <input
          type="number"
          v-model.number="ingredient.amount"
          min="0"
          placeholder="Amount"
          required
        />
        <input v-model="ingredient.unit" placeholder="Unit" required />
        <label> <input type="checkbox" v-model="ingredient.optional" /> Optional </label>
        <button type="button" @click="removeIngredient(i)">&times;</button>
      </div>
      <button type="button" @click="addIngredient">Add Ingredient</button>
    </fieldset>
    <div class="form-actions">
      <button type="submit">{{ isEdit ? 'Save' : 'Add' }}</button>
      <button type="button" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<style scoped src="./RecipeForm.scss"></style>
