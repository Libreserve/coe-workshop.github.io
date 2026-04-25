const isAdminRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

export { isAdminRoute }
