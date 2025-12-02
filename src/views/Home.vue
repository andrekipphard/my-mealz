<template>
  <div class="home-view-container">
    <h1>MyMealz</h1>
    <p>
      Willkommen! Verwalte deine Rezepte, deinen virtuellen Kühlschrank und lass dich inspirieren,
      was du als nächstes kochen könntest.
    </p>
    <ul>
      <li>Rezepte speichern & suchen</li>
      <li>Vorschläge & Zufallsauswahl</li>
      <li>Virtueller Kühlschrank</li>
      <li>Einkaufsliste & Haltbarkeit</li>
    </ul>
    <router-link to="/playground" class="playground-link">Komponenten-Playground</router-link>
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
