import type { IResRocket } from '@/types/rockets'

const API_URL = 'https://api.spacexdata.com/v4/rockets'

export const getRockets = async (): Promise<IResRocket[]> => {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Service error in getRockets:', error)
    throw error // Re-throw untuk di-handle di store
  }
}
