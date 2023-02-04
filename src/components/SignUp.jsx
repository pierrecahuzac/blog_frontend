import { useState, useEffect } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import "../assets/CSS/signup.css";

export default function SignUp() {
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [email, setEmail] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password_validation, setPasswordValidation] = useState("");

  const handlePasswordVisibility = () => {
    setPasswordReveal(!passwordReveal);
  };
  const changeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const changeDisplayName = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };
  const changePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const changePasswordValidation = (e) => {
    e.preventDefault();
    setPasswordValidation(e.target.value);
  };
  const createUser = async () => {
    await axios
      .post(`http://localhost:5000/user/add`, {
        email,
        password,
        password_validation,
        display_name,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
    </div>
  );
}
