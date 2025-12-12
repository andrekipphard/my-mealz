import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import * as api from '@/services/api';
import Recipe from './Recipe.vue';
import type { Recipe as RecipeType } from '@/types/recipe';
beforeEach(() => {
  vi.resetAllMocks && vi.resetAllMocks();
  vi.spyOn(api.api, 'getAllRecipes').mockResolvedValue([]);
});

const recipe: RecipeType = {
  id: 1,
  name: 'Test Recipe',
  description: 'A test recipe',
  instructions: 'Step 1\nStep 2',
  ingredients: [
    { name: 'Flour', amount: 100, unit: 'g' },
    { name: 'Water', amount: 200, unit: 'ml', optional: true },
  ],
  prep_time: 5,
  cook_time: 10,
  servings: 2,
  difficulty: 'easy',
  category: 'Test',
  tags: ['test'],
  image_url: '',
  last_cooked: new Date(),
  favorite: false,
  rating: 4,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('Recipe.vue', () => {
  // Custom stub for router-link that renders slot content
  const global = {
    stubs: {
      'router-link': {
        template: '<a :data-to="to"><slot /></a>',
        props: ['to']
      }
    }
  };

  it('renders recipe name and description', () => {
    const wrapper = mount(Recipe, { props: { recipe }, global });
    expect(wrapper.text()).toContain('Test Recipe');
    expect(wrapper.text()).toContain('A test recipe');
  });

  it('renders ingredients', () => {
    const wrapper = mount(Recipe, { props: { recipe }, global });
    expect(wrapper.text()).toContain('Flour');
    expect(wrapper.text()).toContain('Water');
    expect(wrapper.text()).toContain('optional');
  });

  it('renders an Edit router-link with correct route', () => {
    const wrapper = mount(Recipe, { props: { recipe }, global });
    // Find the <a> element (our router-link stub)
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    const editButton = link.find('button');
    expect(editButton.exists()).toBe(true);
    expect(link.attributes('data-to')).toBe(`/recipes/${recipe.id}/edit`);
  });
});
