import { useState, useEffect } from "react";

import axios from "axios";
import "../assets/CSS/signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [erreur, setErreur] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const login = async () => {
    console.log("ici");
    await axios
      .post(`http://localhost:5000/user/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setErreur(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.erreur);
        setErreur(err.response.data.erreur);
      });
  };

  return (
    <div className="signin">
      <div className="signin_container">
        <form action="submit" className="signin_form">
          <div className="form_input_email">
            <input
              type="email"
              className="form_input"
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div className="form_input_password">
            <input
              type="password"
              className="form_password"
              onChange={changePassword}
              value={password}
            />
          </div>
        </form>
      </div>
      <button type="submit" onClick={login}>
        Accéder à mon compte
      </button>
      <div className="erreur">{erreur}</div>
    </div>
  );
}
