
// Simple auth utility to check if the user is authenticated
// In a real application, this would use a more robust authentication system

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const checkAuth = (): boolean => {
  const authenticated = isAuthenticated();
  return authenticated;
};

export const logout = (): void => {
  localStorage.removeItem("isAuthenticated");
  window.location.href = "/signin";
};
