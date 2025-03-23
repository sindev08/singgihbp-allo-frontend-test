<template>
  <v-app>
    <v-main>
      <router-view v-if="initialized" />
      <div
        v-else
        class="d-flex justify-center align-center"
        style="height: 100vh"
      >
        <v-progress-circular indeterminate color="primary" size="64" />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRocketStore } from '@/stores'
import { ref, onMounted } from 'vue'

const rocketStore = useRocketStore()
const initialized = ref(false)

onMounted(async () => {
  try {
    // Initialize store at app level
    await rocketStore.initialize()
  } catch (error) {
    console.error('Failed to initialize store:', error)
  } finally {
    initialized.value = true
  }
})
</script>
<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script> -->
