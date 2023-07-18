import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/CSS/users.scss";
export function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  const getUsers = async () => {
    const prod_url = import.meta.env.VITE_PROD_URL;
    try {
      const token = localStorage.getItem("access_token");

      axios.interceptors.request.use(
        (req) => {
          req.headers.Authorization = `Bearer ${token}`;
          return req;
        },
        (err) => {
          console.log(err);
          return Promise.reject(err);
        }
      );

      const response = await fetch(`${prod_url}` + "/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      setUsers(res.users);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="users">
      <h1>Users</h1>
      <div className="users-list">
        {users &&
          users.map((user) => (
            <div className="user" key={user.id}>
              <div className="user-header">
                <span>ID:</span>
                <span> {user.id}</span>
              </div>
              <div className="user-body">
                <span>Pseudo:</span> <span>{user.username}</span>
              </div>

              <div className="user-footer">
                <span>
                  Email: <span>{user.email}</span>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
