<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title> Tambah Roket Baru </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="rocketName"
          label="Nama Roket"
          required
        ></v-text-field>
        <v-textarea
          v-model="rocketDescription"
          label="Deskripsi Roket"
          required
        ></v-textarea>
        <v-text-field
          v-model="rocketImage"
          label="URL Gambar Roket"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn color="grey" @click="dialog = false">Batal</v-btn>
        <v-btn color="primary" @click="addRocket" :disabled="!isFormValid"
          >Tambah</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";

const dialog = ref(false);
const rocketName = ref("");
const rocketDescription = ref("");
const rocketImage = ref("");

const emits = defineEmits(["addRocket"]);

const isFormValid = computed(
  () =>
    rocketName.value.trim() !== "" &&
    rocketDescription.value.trim() !== "" &&
    rocketImage.value.trim() !== ""
);

const addRocket = () => {
  const newRocket = {
    id: Date.now().toString(),
    name: rocketName.value,
    description: rocketDescription.value,
    image: rocketImage.value,
  };

  emits("addRocket", newRocket);
  resetForm();
  dialog.value = false;
};

const resetForm = () => {
  rocketName.value = "";
  rocketDescription.value = "";
  rocketImage.value = "";
};

defineExpose({ dialog });
</script>
