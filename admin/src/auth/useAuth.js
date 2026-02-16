export const isAuthenticated = () => {
  const token = localStorage.getItem("admin_token");
  return !!token;
};

export const logout = (navigate) => {
  localStorage.removeItem("admin_token");
  navigate("/login", { replace: true });
};
