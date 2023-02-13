import { useState, useEffect } from "react";
import { emailValidator } from "email-validator";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import "../../assets/CSS/signup.css";

export default function SignUp() {
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [email, setEmail] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password_validation, setPasswordValidation] = useState("");
  const [userCreated, setUserCreated] = useState({});
  const [erreur, setErreur] = useState();
  const handlePasswordVisibility = () => {
    setPasswordReveal(!passwordReveal);
  };
  const changeEmail = (e) => {
    setErreur("");
    e.preventDefault();
    setEmail(e.target.value);
  };
  const changeDisplayName = (e) => {
    setErreur("");
    e.preventDefault();
    setDisplayName(e.target.value);
  };
  const changePassword = (e) => {
    setErreur("");
    e.preventDefault();
    setPassword(e.target.value);
  };
  const changePasswordValidation = (e) => {
    setErreur("");
    e.preventDefault();
    setPasswordValidation(e.target.value);
  };
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const createUser = async () => {
    /*  if (!emailValidator.validate(email)) {
      console.log(`l'email est invalide`);
      return;
    } */
    if (!password) {
      console.log(`entrer un mot de passe`);
      return;
    }
    if (!password_validation) {
      console.log(`les mots de passe doivent être identiques`);
      return;
    }
    await axios
      .post(`${prodUrl}/user/create_user`, {
        email,
        password,
        password_validation,
        display_name,
      })
      .then((res) => {
        setUserCreated(res.data);
      })
      .catch((err) => {
        setErreur(err.response.data.erreur);
      });
  };
  return (
    <div className="signup">
      <div className="signup_container">
        <form action="submit" className="signup_form">
          <div className="form_input_email">
            <input
              type="email"
              className="form_input"
              value={email}
              onChange={changeEmail}
              placeholder="Email"
            />
          </div>
          <div className="form_input_display_name">
            <input
              type="text"
              className="form_input"
              value={display_name}
              onChange={changeDisplayName}
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="form_input_password">
            <input
              type={passwordReveal ? "text" : "password"}
              className="form_password"
              onChange={changePassword}
              value={password}
              placeholder="Mot de passe"
            />
            {passwordReveal ? (
              <span onClick={handlePasswordVisibility}>
                <AiFillEyeInvisible />
              </span>
            ) : (
              <span onClick={handlePasswordVisibility}>
                <AiFillEye />
              </span>
            )}
          </div>
          <div className="form_input_password">
            <input
              type={passwordReveal ? "text" : "password"}
              className="form_password"
              onChange={changePasswordValidation}
              value={password_validation}
              placeholder="Validation du mot de passe"
            />{" "}
          </div>
        </form>
      </div>

      <button type="submit" onClick={createUser}>
        Créer mon compte
      </button>
      <Link to="/signin" className="link_account">
        Vous avez un compte ?
      </Link>
      <div className="signup_message">{userCreated.message}</div>
      <div className="signup_erreur">{erreur}</div>
    </div>
  );
}
