
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

import RecipeList from './RecipeList.vue';
import RecipeListItem from './RecipeListItem/RecipeListItem.vue';
import { vi } from 'vitest';
import * as api from '@/services/api';

const testRecipes = [
  {
    id: 1,
    name: 'Spaghetti',
    instructions: 'Boil water, cook pasta.',
    ingredients: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'Salad',
    instructions: 'Mix veggies.',
    ingredients: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
];

import { recipes as recipesRef, useRecipe } from '@/composables/useRecipe';

beforeEach(() => {
  vi.resetAllMocks();
  // Reset the recipes ref to ensure test isolation
  if (recipesRef && recipesRef.value) recipesRef.value = [];
  vi.spyOn(api.api, 'deleteRecipe').mockResolvedValue();
});

describe('RecipeList.vue', () => {
  const global = {
    stubs: { 'router-link': true },
    components: { RecipeListItem }
  };

  it('renders a list of recipes', async () => {
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([...testRecipes]);
    const wrapper = mount(RecipeList, { global });
    await new Promise(resolve => setTimeout(resolve));
    testRecipes.forEach((recipe) => {
      expect(wrapper.text()).toContain(recipe.name);
    });
  });

  it('shows empty message if no recipes', async () => {
    vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([]);
    const wrapper = mount(RecipeList, { global });
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.text()).toContain('No recipes found.');
  });

  it('removes recipe from list when delete event is emitted', async () => {
    // First call returns all recipes, second call returns one less after deletion
    const getAllRecipesMock = vi.spyOn(api.api, 'getAllRecipes');
    getAllRecipesMock.mockResolvedValueOnce([...testRecipes]);
    getAllRecipesMock.mockResolvedValueOnce([testRecipes[1]]); // After delete
    getAllRecipesMock.mockResolvedValue([testRecipes[1]]); // Fallback for any further calls
    window.confirm = () => true;
    // Explicitly load recipes before mounting
    const { loadRecipes } = useRecipe();
    await loadRecipes();
    const wrapper = mount(RecipeList, { global });
    await new Promise(resolve => setTimeout(resolve));
    await wrapper.vm.$nextTick();
    let items = wrapper.findAllComponents(RecipeListItem);
    const initialCount = items.length;
    expect(initialCount).toBeGreaterThan(0);
    await items[0].vm.$emit('delete', testRecipes[0].id);
    await new Promise(resolve => setTimeout(resolve));
    await wrapper.vm.$nextTick();
    const afterCount = wrapper.findAllComponents(RecipeListItem).length;
    expect(afterCount).toBe(initialCount - 1);
  });
});
