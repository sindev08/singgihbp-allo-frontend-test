import axios from "axios";

const API_URL = "https://api.spacexdata.com/v4/rockets";

export const getRockets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching rockets:", error);
  }
};
