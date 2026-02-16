export type Role = "USER" | "ADMIN";

export const setAuth = (token: string, role: Role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role") as Role | null;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
