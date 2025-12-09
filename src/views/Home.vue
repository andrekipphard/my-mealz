<template>
  <div class="home-view-container">
    <h1>MyMealz</h1>
    <p>
      Welcome! Manage your recipes, your virtual fridge, and get inspired for what to cook next.
    </p>
    <ul>
      <li>Save & search recipes</li>
      <li>Suggestions & random picks</li>
      <li>Virtual fridge</li>
      <li>Shopping list & shelf life</li>
    </ul>
    <router-link to="/playground" class="playground-link">Component Playground</router-link>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HomeView' });
</script>

<style lang="scss" scoped>
.playground-link {
  display: inline-block;
  margin-top: 2rem;
  color: #1976d2;
  text-decoration: underline;
  font-size: 1.1rem;
}
</style>
