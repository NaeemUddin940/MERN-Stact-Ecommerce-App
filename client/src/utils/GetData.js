// src/utils/api.js
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// 🧠 Common GET request
export async function getData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("GET API Error:", error);
    return {
      success: false,
      error: true,
      message: "Failed to fetch data",
    };
  }
}
