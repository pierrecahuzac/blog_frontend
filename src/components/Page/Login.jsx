import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "../../assets/CSS/signin.scss";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const { user, setUser } = useUserContext();
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState();
  const navigate = useNavigate();
  const changeEmail = (e) => {
    setError("");
    setUser({ ...user, email: e.target.value });
  };
  const changePassword = (e) => {
    setError("");
    setUser({ ...user, password: e.target.value });
  };
  const prodUrl = import.meta.env.VITE_PROD_URL;

  const login = async () => {
    if (!user.password || !user.email) {
      setError(`Pas d'email ou de mot de passe`);
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(res);
      setUser({
        username: res.data.user.username,
        logged: true,
        userId: res.data.user.id,
        email: res.data.user.email,
      });
      localStorage.setItem("email", user.email);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("logged", true);
      setSucess(res.data.sucess);
      navigate(`/profile/user/${user.userId}`);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
      return;
    }
  };

  return (
    <div className="signin">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="signin_container">
        <form action="submit" className="signin_form">
          <div className="form_input_email">
            <input
              type="email"
              className="form_input"
              value={user.email}
              onChange={changeEmail}
              placeholder="Email"
            />
          </div>
          <div className="form_input_password">
            <input
              type="password"
              className="form_password"
              onChange={changePassword}
              value={user.password}
              placeholder="Mot de passe"
            />
          </div>
        </form>
      </div>
      <button type="submit" onClick={login} className="btn_submit_account">
        Connexion
      </button>
      <Link to="/signup" className="link_account">
        Vous n'avez pas de compte ?
      </Link>

      {error && <div className="erreur">{error}</div>}
      {sucess && <div className="signup_sucess">{sucess}</div>}
    </div>
  );
}
