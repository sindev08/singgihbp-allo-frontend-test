import { defineStore } from "pinia";
import { ref } from "vue";
import type { IResRocket, IRocket } from "@/types/rockets";
import { getRockets } from "@/services/rockets";

export const useRocketStore = defineStore("rocketStore", () => {
  const rockets = ref<IRocket[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 🚀 Load dari localStorage saat store pertama kali dibuat
  const loadFromLocalStorage = () => {
    const savedRockets = localStorage.getItem("rockets");
    if (savedRockets) {
      rockets.value = JSON.parse(savedRockets);
    }
  };
  // 🚀 Fetch data dari API jika tidak ada di localStorage
  const fetchRockets = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (!rockets.value.length) {
        const savedRockets = localStorage.getItem("rockets");
        if (savedRockets) {
          rockets.value = JSON.parse(savedRockets);
          loading.value = false;
          return;
        }
      }

      // 🔥 Fetch dari API jika localStorage kosong
      const data = await getRockets();
      rockets.value = data.map((r: IResRocket) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        image: r.flickr_images[0] || "",
      }));

      // 🚀 Simpan ke localStorage
      localStorage.setItem("rockets", JSON.stringify(rockets.value));
    } catch (error) {
      console.error("Error fetching rockets:", error);
      //   error.value = "Gagal mengambil data roket.";
    } finally {
      loading.value = false;
    }
  };

  // 🚀 Tambah roket baru dan simpan ke localStorage
  const addRocket = (newRocket: IRocket) => {
    rockets.value.push(newRocket);
    localStorage.setItem("rockets", JSON.stringify(rockets.value));
  };

  // 🔥 Jalankan loadFromLocalStorage saat pertama kali store dipakai
  loadFromLocalStorage();

  return { rockets, loading, error, fetchRockets, addRocket };
});
