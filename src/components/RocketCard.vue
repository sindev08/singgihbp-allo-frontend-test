<template>
  <v-card class="rocket-card" outlined>
    <v-img :src="rocket.image" height="200px" cover></v-img>
    <v-card-title>{{ rocket.name }}</v-card-title>
    <v-card-subtitle>{{ rocket.description }}</v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Rocket {
  id: string;
  name: string;
  description: string;
  image: string;
}

defineProps<{ rocket: Rocket }>();
</script>

<style scoped>
.rocket-card {
  max-width: 400px;
  margin: auto;
}
</style>
