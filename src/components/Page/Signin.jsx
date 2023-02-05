import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../Button";
import "../../assets/CSS/signin.css";

export default function Signin({ userExist, setUserExist }) {
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
        console.log(res);
        console.log(res.data.logged);
        setUserExist({
          email: res.data.record.fields.email,
          display_name: res.data.record.fields.display_name,
          logged: res.data.logged,
          userId: res.data.record.id,
        });
      })
      .catch((err) => {
        console.log(err);
        /*  console.log(err.response.data); */
        /* setErreur(err.erreur); */
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
      <Link to="/signup" className="link_account">
        Vous n'avez pas de compte ?
      </Link>
      <div className="erreur">{erreur}</div>
      <div>{userExist.email}</div>
    </div>
  );
}
