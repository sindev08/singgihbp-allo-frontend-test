<template>
  <v-container>
    <!-- Error state -->
    <v-alert v-if="storeError" type="error" class="mb-4">
      {{ storeError }}
      <v-btn color="white" variant="text" @click="refreshData" class="ml-2">
        Try again
      </v-btn>
    </v-alert>

    <!-- Search & Add button -->
    <div class="d-flex align-center mb-4">
      <v-text-field
        v-model="search"
        label="Search Rocket by name..."
        hide-details
        density="compact"
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="openDialog" class="ml-2">
        Add Rocket
      </v-btn>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="d-flex justify-center my-8">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- Empty state -->
    <v-alert v-else-if="isEmpty && !isLoading" type="info" class="my-4">
      Rocket is not available
      <v-btn color="primary" variant="text" @click="refreshData" class="ml-2">
        Load data
      </v-btn>
    </v-alert>

    <!-- Rocket list -->
    <v-row v-else>
      <v-col
        v-for="rocket in filteredRockets"
        :key="rocket.id"
        cols="12"
        md="6"
        lg="4"
      >
        <RocketCard :rocket="rocket" />
      </v-col>

      <!-- No search results -->
      <v-col v-if="!filteredRockets.length && search" cols="12">
        <v-alert type="info" class="text-center">
          🚀 There is no rocket with the name "{{ search }}"
        </v-alert>
      </v-col>
    </v-row>

    <AddRocketDialog ref="addRocketDialog" @add-rocket="addNewRocket" />
  </v-container>
</template>

<script setup lang="ts">
import { useRocketStore } from '@/stores'
import type { IRocket } from '@/types/rockets'
import { ref, computed, onMounted } from 'vue'
import type AddRocketDialog from './AddRocketDialog.vue'

// Store
const rocketStore = useRocketStore()
const {
  rockets,
  // loading: storeLoading,
  error: storeError,
  isEmpty,
  initialized,
  initialize,
  refreshRockets,
  addRocket,
} = rocketStore

// Local state
const search = ref('')
const isLoading = ref(true)
const addRocketDialog = ref<InstanceType<typeof AddRocketDialog> | null>(null)

// Computed
const filteredRockets = computed(() =>
  rockets.filter((rocket) =>
    rocket.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

// Methods
const openDialog = () => {
  if (addRocketDialog.value) {
    addRocketDialog.value.dialog = true
  }
}

const addNewRocket = (newRocket: IRocket) => {
  addRocket(newRocket)
}

const refreshData = async () => {
  try {
    isLoading.value = true
    await refreshRockets()
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  // RocketList mounted, initialized
  try {
    isLoading.value = true

    // Initialize store if not already initialized
    if (!initialized) {
      // Initializing store
      await initialize()
    }
  } catch (err) {
    console.error('Error in component mount:', err)
  } finally {
    isLoading.value = false
  }
})
</script>
