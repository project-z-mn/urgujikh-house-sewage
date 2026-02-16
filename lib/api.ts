// Use environment variable for API base URL
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Custom error class with status code
export class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Provide better error messages based on status
    if (res.status === 401) {
      throw new ApiError("Нэвтрэх шаардлагатай", 401);
    } else if (res.status === 403) {
      throw new ApiError("Хандах эрхгүй байна", 403);
    } else if (res.status === 404) {
      throw new ApiError("Олдсонгүй", 404);
    } else if (res.status >= 500) {
      throw new ApiError("Серверийн алдаа", res.status);
    }
    throw new ApiError(data?.message || "Хүсэлт амжилтгүй боллоо", res.status || 500);
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
    throw new ApiError("Нэвтрэх шаардлагатай", 401);
  }

  return apiFetch(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
