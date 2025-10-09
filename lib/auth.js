export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("token", token);
  } catch (e) {
    console.warn("Failed to set token", e);
  }
}

export function setUser(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.warn("Failed to set user", e);
  }
}
