import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IResRocket, IRocket } from '@/types/rockets'
import { getRockets } from '@/services/rockets'

export const useRocketStore = defineStore('rocketStore', () => {
  const rockets = ref<IRocket[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false) // Track if store has been initialized

  // Computed for status
  const isEmpty = computed(() => rockets.value.length === 0)

  // Inisialisasi store - called once when the application starts
  const initialize = async () => {
    if (initialized.value) return // Prevent multiple initializations

    loading.value = true
    error.value = null

    try {
      // Try loading from localStorage first
      const savedRockets = localStorage.getItem('rockets')

      if (savedRockets) {
        rockets.value = JSON.parse(savedRockets)
      } else {
        // If not in localStorage, fetch from API
        await fetchFromAPI()
      }
    } catch (err) {
      console.error('Store initialization error:', err)
      error.value = 'Gagal menginisialisasi data.'
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  // Function to fetch from API
  const fetchFromAPI = async () => {
    try {
      // Fetching rockets from API
      const data = await getRockets()

      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid API response format')
      }

      rockets.value = data.map((r: IResRocket) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        image: r.flickr_images[0] || '',
        country: r.country,
        cost_per_launch: r.cost_per_launch,
        first_flight: r.first_flight,
        active: r.active,
      }))

      // Save to localStorage
      localStorage.setItem('rockets', JSON.stringify(rockets.value))
    } catch (err) {
      console.error('API fetch error:', err)
      error.value = 'Gagal mengambil data dari API.'
      throw err // Re-throw for top level handling
    }
  }

  // Refresh data - called when the user wants to refresh the data.
  const refreshRockets = async () => {
    loading.value = true
    error.value = null

    try {
      await fetchFromAPI()
    } catch (err) {
      // Error already handled in fetchFromAPI
    } finally {
      loading.value = false
    }
  }

  // Add new rocket
  const addRocket = (newRocket: IRocket) => {
    rockets.value.push(newRocket)
    localStorage.setItem('rockets', JSON.stringify(rockets.value))
  }

  return {
    rockets,
    loading,
    error,
    isEmpty,
    initialized,
    initialize,
    refreshRockets,
    addRocket,
  }
})
