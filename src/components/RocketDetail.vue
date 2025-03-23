<template>
  <v-container v-if="rocket">
    <v-img :src="rocket.image" height="300px" />
    <h2 class="mt-4">{{ rocket.name }}</h2>
    <p class="mb-4">{{ rocket.description }}</p>
    <v-list>
      <v-list-item>🚀 Country: {{ rocket.country }}</v-list-item>
      <v-list-item
        >💰 Cost per Launch: ${{
          rocket.cost_per_launch.toLocaleString()
        }}</v-list-item
      >
      <v-list-item>📅 First Flight: {{ rocket.first_flight }}</v-list-item>
      <v-list-item>🚀 Active: {{ rocket.active ? 'Yes' : 'No' }}</v-list-item>
    </v-list>
    <v-btn color="primary" class="mt-3" @click="$router.push('/')"
      >🔙 Back</v-btn
    >
  </v-container>

  <v-alert v-else type="error">Rocket not found!</v-alert>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRocketStore } from '@/stores'

const route = useRoute()
const rocketStore = useRocketStore()

const rocket = computed(() =>
  rocketStore.rockets.find((r) => r.id === route.params.id),
)

onMounted(() => {
  if (!rocket.value) {
    rocketStore.refreshRockets()
  }
})
</script>
