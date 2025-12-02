import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Recipe from './Recipe.vue';
import type { Recipe as RecipeType } from '@/types/recipe';

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
  it('renders recipe name and description', () => {
    const wrapper = mount(Recipe, { props: { recipe } });
    expect(wrapper.text()).toContain('Test Recipe');
    expect(wrapper.text()).toContain('A test recipe');
  });

  it('renders ingredients', () => {
    const wrapper = mount(Recipe, { props: { recipe } });
    expect(wrapper.text()).toContain('Flour');
    expect(wrapper.text()).toContain('Water');
    expect(wrapper.text()).toContain('optional');
  });

  it('renders an Edit router-link with correct route', () => {
    const wrapper = mount(Recipe, { props: { recipe } });
    const editButton = wrapper.findAll('button').find(btn => btn.text() === 'Edit');
    expect(editButton).toBeTruthy();
    const parent = editButton!.element.parentElement;
    // Accept both <router-link> and <router-link-stub>
    const tag = parent?.tagName.toLowerCase();
    expect(['router-link', 'router-link-stub']).toContain(tag);
    expect(parent?.getAttribute('to')).toBe(`/recipes/${recipe.id}/edit`);
  });
});
