<template>
  <v-container>
    <v-text-field v-model="search" label="Cari Roket..." class="mb-4" />

    <v-btn color="primary" @click="openDialog"> Tambah Roket </v-btn>
    <v-btn v-if="error" color="error" class="ml-2" @click="fetchRockets">
      Coba Lagi
    </v-btn>

    <v-alert v-if="error" type="error" class="mt-3">
      {{ error }}
    </v-alert>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="mt-5"
    />

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

      <!-- ✅ Tampilkan jika pencarian kosong -->
      <v-col v-if="!filteredRockets.length && search" cols="12">
        <v-alert type="info" class="text-center">
          🚀 Search name tidak tersedia
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
import AddRocketDialog from './AddRocketDialog.vue'
// import { useRocketStore } from "@/stores/rocketStore";

const rocketStore = useRocketStore()
const { rockets, loading, error, fetchRockets, addRocket } = rocketStore

const search = ref('')
const addRocketDialog = ref<InstanceType<typeof AddRocketDialog> | null>(null)

const filteredRockets = computed(() =>
  rockets.filter((rocket) =>
    rocket.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

console.log('filteredRockets test', filteredRockets)

const openDialog = () => {
  if (addRocketDialog.value) {
    addRocketDialog.value.dialog = true
  }
}

const addNewRocket = (newRocket: IRocket) => {
  addRocket(newRocket)
}

onMounted(fetchRockets)
</script>

<!-- <template>
  <v-container>
    <v-text-field v-model="search" label="Cari Roket..." class="mb-4" />

    <v-row>
      <v-col
        v-for="rocket in filteredRockets"
        :key="rocket.id"
        cols="12"
        md="6"
        lg="4"
      >
        <RocketCard :rocket="rocket" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getRockets } from "@/services/rockets";
import type { IResRocket, IRocket } from "@/types/rockets";

const rockets = ref<IRocket[]>([]);
const search = ref("");

const filteredRockets = computed(() =>
  rockets.value.filter((rocket) =>
    rocket.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const fetchRocketData = async () => {
  try {
    const data = await getRockets();
    rockets.value = data.map((r: IResRocket) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      image: r.flickr_images[0] || "",
    }));
    console.log("data", data);
  } catch (error) {
    console.error("Failed to fetch rockets:", error);
  }
};

onMounted(fetchRocketData);
</script>

<style scoped>
.v-container {
  max-width: 1200px;
  margin: auto;
}
</style> -->
