// Use environment variable for API base URL
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Provide better error messages based on status
    if (res.status === 401) {
      throw new Error("Нэвтрэх шаардлагатай");
    } else if (res.status === 403) {
      throw new Error("Хандах эрхгүй байна");
    } else if (res.status === 404) {
      throw new Error("Олдсонгүй");
    } else if (res.status >= 500) {
      throw new Error("Серверийн алдаа");
    }
    throw new Error(data?.message || "Хүсэлт амжилтгүй боллоо");
  }
  return data;
}

// ✅ token header helper
export function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper to get token
export function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

// Helper for authenticated API calls
export async function apiFetchAuth(path: string, options: RequestInit = {}) {
  const token = getToken();
  
  if (!token) {
    throw new Error("Нэвтрэх шаардлагатай");
  }

  return apiFetch(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
