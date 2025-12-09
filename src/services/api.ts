import axios from 'axios';
import type { Recipe } from '@/types/recipe';

const API_URL = 'http://localhost:3001/api';

export const api = {
  async getAllRecipes(): Promise<Recipe[]> {
    const res = await axios.get(`${API_URL}/recipes`);
    return res.data;
  },
  async getRecipeById(id: number): Promise<Recipe> {
    const res = await axios.get(`${API_URL}/recipes/${id}`);
    return res.data;
  },
  async addRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>): Promise<Recipe> {
    const res = await axios.post(`${API_URL}/recipes`, recipe);
    return res.data;
  },
  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const res = await axios.put(`${API_URL}/recipes/${recipe.id}`, recipe);
    return res.data;
  },
  async deleteRecipe(id: number): Promise<void> {
    await axios.delete(`${API_URL}/recipes/${id}`);
  },
};
