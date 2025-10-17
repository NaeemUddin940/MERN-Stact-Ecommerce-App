export const UploadImage = async (url, formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      message:
        error.message || "Internal Server  Error to Post Data on Backend!",
      error: true,
      success: false,
    };
  }
};
