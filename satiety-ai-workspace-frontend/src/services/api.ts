// const API_BASE_URL = "http://localhost:5000";

export async function checkBackendHealth() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`);

  if (!response.ok) {
    throw new Error("Backend is not responding.");
  }

  return response.json();
}