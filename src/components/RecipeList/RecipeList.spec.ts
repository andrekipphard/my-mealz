
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeList from './RecipeList.vue';
import { testRecipes } from '@/mocks/recipes';
import { useRecipe } from '@/composables/useRecipe';

beforeEach(() => {
  const { setRecipes } = useRecipe();
  setRecipes(testRecipes);
});

describe('RecipeList.vue', () => {
  it('renders a list of recipes', () => {
    const wrapper = mount(RecipeList, {
      global: {
        stubs: { 'router-link': true },
      },
    });
    testRecipes.forEach((recipe) => {
      expect(wrapper.text()).toContain(recipe.name);
    });
  });

  it('shows empty message if no recipes', () => {
    const { setRecipes } = useRecipe();
    setRecipes([]);
    const wrapper = mount(RecipeList, {
      global: {
        stubs: { 'router-link': true },
      },
    });
    expect(wrapper.text()).toContain('No recipes found.');
  });

  it('removes recipe from list when delete event is emitted', async () => {
    window.confirm = () => true;
    const wrapper = mount(RecipeList, {
      global: {
        stubs: { 'router-link': true },
      },
    });
    const initialCount = wrapper.findAll('.recipe-list__item').length;
    const firstItem = wrapper.findComponent({ name: 'RecipeListItem' });
    await firstItem.vm.$emit('delete', testRecipes[0].id);
    await wrapper.vm.$nextTick();
    const afterCount = wrapper.findAll('.recipe-list__item').length;
    expect(afterCount).toBe(initialCount - 1);
  });
});
