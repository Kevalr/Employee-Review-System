export const isLoggedIn = () => {
  const session = JSON.parse(localStorage.getItem("session")) || {};
  return session?.token;
};

export const setSession = (data) => {
  localStorage.setItem("session", JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
};

export const getSession = () =>
  JSON.parse(localStorage.getItem("session")) || {};

export const removeSession = () => localStorage.removeItem("session");

export const isAdmin = () => JSON.parse(localStorage.getItem("session"))?.user?.isAdmin ?? false;

export const getUser = () => JSON.parse(localStorage.getItem("session"))?.user ?? null;
