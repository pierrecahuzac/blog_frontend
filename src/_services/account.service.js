import Axios from "./caller.service";

let login = (credentials) => {
  console.log(credentials);
  return Axios.post("/auth/login", credentials);
};

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};
let getToken = () => {
  return localStorage.getItem("token");
};
let isLogged = () => {
  let token = localStorage.getItem("token");
  // true ou false
  return !!token;
};

export const accountService = { login, saveToken, logout, isLogged, getToken };
