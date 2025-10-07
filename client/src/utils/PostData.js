export const postData = async (url, formData) => {
  console.log(import.meta.env.VITE_BACKEND_API_URL);
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json(); // ✅ parse JSON
    return data; // ✅ return to caller
  } catch (error) {
    return {
      message:
        error.message || "Internal Server  Error to Post Data on Backend!",
      error: true,
      success: false,
    };
  }
};
