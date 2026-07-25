const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/chat`);

  if (!response.ok) {
    throw new Error("Backend is not responding.");
  }

  return response.json();
}
