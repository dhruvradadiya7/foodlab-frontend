
export const isLoggedIn = () => {
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);
  return !!(user && user.uid);
};

export const isAdmin = () => {
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);
  return !!(user && user.role && user.role === "admin");
};

export const getUserId = () => {
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);
  return user && user.uid;
};


export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
};
