import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeForm from './RecipeForm.vue';

import type { Recipe } from '@/types/recipe';

const baseRecipe: Recipe = {
  id: 1,
  name: 'Test Recipe',
  description: 'A test recipe',
  instructions: 'Mix and cook.',
  ingredients: [
    { name: 'Egg', amount: 2, unit: 'pcs', optional: false },
    { name: 'Milk', amount: 200, unit: 'ml', optional: true }
  ],
  prep_time: 10,
  cook_time: 20,
  servings: 2,
  difficulty: 'easy',
  category: 'Breakfast',
  tags: ['test', 'breakfast'],
  image_url: '',
  last_cooked: undefined,
  favorite: false,
  rating: undefined,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('RecipeForm', () => {
  it('renders add form and emits save', async () => {
    const wrapper = mount(RecipeForm);
    await wrapper.find('input[required]').setValue('New Recipe');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('save')).toBeTruthy();
  });

  it('renders edit form and emits save', async () => {
    const wrapper = mount(RecipeForm, {
      props: { recipe: baseRecipe },
    });
    await wrapper.find('input[required]').setValue('Updated Recipe');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('save')).toBeTruthy();
    expect((wrapper.find('input[required]').element as HTMLInputElement).value).toBe('Updated Recipe');
  });

  it('emits close when cancel is clicked', async () => {
    const wrapper = mount(RecipeForm);
    const cancelButton = wrapper.findAll('button[type="button"]').find(btn => btn.text() === 'Cancel');
    expect(cancelButton).toBeTruthy();
    await cancelButton!.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
