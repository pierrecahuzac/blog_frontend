import axios from "axios";
import { accountService } from "./account.service";
const Axios = axios.create({
  baseURL: "http://localhost:5000",
});

// Intercepteur pour le token

Axios.interceptors.request.use((req) => {
  if (accountService.isLogged()) {
    req.headers.Authorization = "Bearer" + accountService.getToken();
  }
  console.log(req);
  return req;
});

export default Axios;
