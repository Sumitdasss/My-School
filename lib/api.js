const API_URL = "http://localhost:5000";

export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ Admin token পাওয়া যায়নি");
    throw new Error("Admin token missing");
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
};