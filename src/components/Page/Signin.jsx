import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";
import axios from "axios";

import "../../assets/CSS/signin.css";

export default function Signin() {
  const { user, setUser } = useUserContext();
  const [erreur, setErreur] = useState("");

  const changeEmail = (e) => {
    setErreur("");
    setUser({ ...user, email: e.target.value });
  };
  const changePassword = (e) => {
    setErreur("");
    setUser({ ...user, password: e.target.value });
  };
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const login = async () => {
    if (!user.password || !user.email) {
      setErreur(`Pas d'email ou de mot de passe`);
      return;
    }
    try {
      const res = await axios.post(`${prodUrl}/api/user/login`, {
        email: user.email,
        password: user.password,
      });
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
      return redirect(`/backoffice/user/${user.userId}`);
    } catch (err) {
      console.log(err);

      setErreur(err.response.data.error);
    }
    /*  .then((res) => {
        setUser({
          username: res.data.user.username,
          logged: true,
          userId: res.data.user.id,
          email: res.data.user.email,
        });

     
      }) 
      .catch((err) => {
        
      });*/
  };

  return (
    <div className="signin">
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
      <div className="erreur">{erreur}</div>
    </div>
  );
}
