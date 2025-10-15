// src/utils/api.js

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// 🧠 Common DELETE request
export async function DeleteData(endpoint) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("DELETE API Error:", error);
    return {
      success: false,
      error: true,
      message: "Failed to delete data",
    };
  }
}
