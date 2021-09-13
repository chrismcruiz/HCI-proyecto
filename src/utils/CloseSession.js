import { getFromStorage } from './storage'

export const logOut = () => {
  const obj = getFromStorage("the_main_app");
  if (obj && obj.token) {
    const { token } = obj;
    // verify token
    fetch("http://localhost:4000/app/logout?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          window.localStorage.clear();
          window.location = "/";
        } else {
        }
      });
  } else {
  }
};