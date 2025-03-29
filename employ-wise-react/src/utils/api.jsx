import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
