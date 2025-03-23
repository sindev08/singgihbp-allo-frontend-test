<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title> Tambah Roket Baru </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="rocketName"
          label="Rocket name"
          required
        ></v-text-field>
        <v-textarea
          v-model="rocketDescription"
          label="Rocket description"
          required
        ></v-textarea>
        <v-text-field
          v-model="rocketImage"
          label="Rocket Image URL"
          required
        ></v-text-field>
        <v-text-field
          v-model="firstFlight"
          label="First Flight"
          required
        ></v-text-field>
        <v-text-field
          v-model="costPerLaunch"
          label="Cost Per Launch"
          required
        ></v-text-field>
        <v-text-field v-model="country" label="Country" required></v-text-field>
        <v-switch v-model="active" label="Active"></v-switch>
      </v-card-text>

      <v-card-actions>
        <v-btn color="grey" @click="dialog = false">Batal</v-btn>
        <v-btn color="primary" @click="addRocket" :disabled="!isFormValid"
          >Add Rocket</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { IRocket } from '@/types/rockets'
import { ref, computed, defineEmits } from 'vue'

const dialog = ref(false)
const rocketName = ref('')
const rocketDescription = ref('')
const rocketImage = ref('')
const firstFlight = ref('')
const costPerLaunch = ref(0)
const country = ref('')
const active = ref(false)

const emits = defineEmits(['addRocket'])

// Check if form is valid
const isFormValid = computed(
  () =>
    rocketName.value.trim() !== '' &&
    rocketDescription.value.trim() !== '' &&
    rocketImage.value.trim() !== '' &&
    firstFlight.value.trim() !== '' &&
    costPerLaunch.value > 0 &&
    country.value.trim() !== '',
)

const addRocket = () => {
  const newRocket: IRocket = {
    id: Date.now().toString(),
    name: rocketName.value,
    description: rocketDescription.value,
    image: rocketImage.value,
    country: country.value,
    cost_per_launch: costPerLaunch.value,
    first_flight: firstFlight.value,
    active: active.value,
  }

  emits('addRocket', newRocket)
  // Reset form when add new rocket
  resetForm()
  dialog.value = false
}

// Reset form
const resetForm = () => {
  rocketName.value = ''
  rocketDescription.value = ''
  rocketImage.value = ''
  firstFlight.value = ''
  costPerLaunch.value = 0
  country.value = ''
  active.value = false
}

defineExpose({ dialog })
</script>
