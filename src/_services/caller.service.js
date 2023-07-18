import axios from "axios";
import { accountService } from "./account.service";
const Axios = axios.create({
  baseURL: import.meta.env.VITE_PROD_URL,
});

// Intercepteur pour le token

Axios.interceptors.request.use((req) => {
  if (accountService.isLogged()) {
    req.headers.Authorization = "Bearer" + accountService.getToken();
  }

  return req;
});

export default Axios;
