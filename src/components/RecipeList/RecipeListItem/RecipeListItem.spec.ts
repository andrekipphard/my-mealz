

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { Recipe } from '@/types/recipe';

// Mock useRecipe BEFORE importing the component
const deleteRecipeMock = vi.fn();
vi.mock('@/composables/useRecipe', () => ({
  useRecipe: () => ({ deleteRecipe: deleteRecipeMock })
}));

import { mount } from '@vue/test-utils';
import RecipeListItem from './RecipeListItem.vue';

const recipe: Recipe = {
  id: 1,
  name: 'Spaghetti Bolognese',
  description: 'Classic Italian pasta dish',
  instructions: 'Cook pasta. Prepare sauce. Mix together.',
  ingredients: [
    { name: 'Spaghetti', amount: 200, unit: 'g' },
    { name: 'Ground beef', amount: 100, unit: 'g' },
  ],
  prep_time: 10,
  cook_time: 20,
  servings: 2,
  difficulty: 'easy',
  category: 'Pasta',
  tags: ['italian', 'main'],
  image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('RecipeListItem.vue', () => {
  beforeEach(() => {
    deleteRecipeMock.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('renders recipe info', () => {
    const wrapper = mount(RecipeListItem, {
      props: { recipe },
      global: {
        stubs: { 'router-link': true },
      },
    });
    expect(wrapper.text()).toContain(recipe.name);
    expect(wrapper.text()).toContain(recipe.description);
    expect(wrapper.text()).toContain(recipe.category);
    expect(wrapper.find('img').attributes('src')).toBe(recipe.image_url);
  });

  it('renders view button as router-link with correct route', () => {
    const wrapper = mount(RecipeListItem, {
      props: { recipe },
      global: {
        stubs: { 'router-link': { template: '<a><slot /></a>' } },
      },
    });
    // Find the button with text 'View' inside the stub
    const viewBtn = wrapper.find('button');
    expect(viewBtn.exists()).toBe(true);
    expect(viewBtn.text()).toContain('View');
  });

  it('calls deleteRecipe with correct id when delete button is clicked', async () => {
    const wrapper = mount(RecipeListItem, {
      props: { recipe },
      global: {
        stubs: { 'router-link': true },
      },
    });
    await wrapper.find('[data-testid="delete-btn"]').trigger('click');
    expect(deleteRecipeMock).toHaveBeenCalledWith(recipe.id);
  });
});
