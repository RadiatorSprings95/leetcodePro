import axiosInstance from "./axios";
export async function executeCode(language, code) {
  try {
    // Use your configured axiosInstance instead of standard fetch
    const response = await axiosInstance.post("/api/code/execute", {
      language,
      code
    });

    return response.data;

  } catch (error) {
    return { 
        success: false, 
        error: error.response?.data?.error || error.message 
    };
  }
}