<template>
  <v-card
    class="rocket-card cursor-pointer"
    outlined
    @click="goToDetail(rocket)"
  >
    <v-img :src="rocket.image" height="200px" cover></v-img>
    <v-card-title>{{ rocket.name }}</v-card-title>
    <v-card-subtitle>{{ rocket.description }}</v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import type { IRocket } from '@/types/rockets'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{ rocket: IRocket }>()
const router = useRouter()
// routing to detail
const goToDetail = (rocket: IRocket) => {
  router.push(`/rocket/${rocket.id}`)
}
</script>

<style scoped>
.rocket-card {
  max-width: 400px;
  margin: auto;
}
</style>
