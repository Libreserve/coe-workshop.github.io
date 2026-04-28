const isAdminRoute = (): boolean => {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
};

export { isAdminRoute };
