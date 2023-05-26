const prodUrl = import.meta.env.VITE_PROD_URL;
import Axios from "./caller.service";
let getAllUsers = async () => {
  try {
    Axios.post();
    /*  const response = await fetch(`${prodUrl}/api/users`);
    const data = await response.json();
  */
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
let getUser = async (id) => {
  try {
    const response = await fetch(`${prod_url}/api/user/${id}`);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

export const userService = {
  getAllUsers,
  getUser,
};
