import { useState } from "react";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import { useUserContext } from "../../utils/userContext";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";

import "../../assets/CSS/signup.css";

export default function SignUp() {
  const { user, setUser } = useUserContext();
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
    setUser({ ...user, email: e.target.value });
  };
  const changeDisplayName = (e) => {
    setErreur("");
    e.preventDefault();
    setDisplayName(e.target.value);
    setUser({ ...user, display_name: e.target.value });
  };
  const changePassword = (e) => {
    setErreur("");
    e.preventDefault();
    setUser({ ...user, password: e.target.value });
  };
  const changePasswordValidation = (e) => {
    setErreur("");
    e.preventDefault();
    setUser({ ...user, password_validation: e.target.value });
  };
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const createUser = async () => {
    const errorsArray = [];
    var schema = new passwordValidator();

    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(2) // Must have at least 2 digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123", "1234"]); // Blacklist these values
    if (!schema.validate(user.password)) {
      setErreur(`Mot de passe incorrect`);
      errorsArray.push(`Mot de passe incorrect`);
      return;
    }
    if (!emailValidator.validate(user.email) || !user.email) {
      setErreur(`L'email n'est pas valide / est vide`);
      errorsArray.push(`L'email n'est pas valide / est vide`);
      return;
    }
    if (!user.password) {
      setErreur(`entrer un mot de passe`);
      errorsArray.push(`entrer un mot de passe`);
      return;
    }
    if (!user.password_validation) {
      setErreur(`la validation du mot de passe est vide`);
      errorsArray.push(`la validation du mot de passe est vide`);
      return;
    }
    if (user.password_validation !== user.password) {
      setErreur(`les mots de passe doivent être identiques`);
      errorsArray.push(`les mots de passe doivent être identiques`);
      return;
    }
    if (errorsArray.length) {
      console.log(errorsArray);
      errorsArray.forEach((err) => console.log(err));
      setErreur(errorsArray);
      return;
    }
    await axios
      .post(`${prodUrl}/user/create_user`, {
        email: user.email,
        password: user.password,
        password_validation: user.password_validation,
        display_name: user.display_name,
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
              value={user.email}
              onChange={changeEmail}
              placeholder="Email"
            />
          </div>
          <div className="form_input_display_name">
            <input
              type="text"
              className="form_input"
              value={user.display_name}
              onChange={changeDisplayName}
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="form_input_password">
            <input
              type={passwordReveal ? "text" : "password"}
              className="form_password"
              onChange={changePassword}
              value={user.password}
              placeholder="Mot de passe"
            />
          </div>
          <div className="form_input_password">
            <input
              type={passwordReveal ? "text" : "password"}
              className="form_password"
              onChange={changePasswordValidation}
              value={user.password_validation}
              placeholder="Validation du mot de passe"
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        onClick={createUser}
        className="btn_submit_new_account"
      >
        Créer mon compte
      </button>
      {passwordReveal ? (
        <div onClick={handlePasswordVisibility} className="form_reveal">
          <AiFillEyeInvisible />
        </div>
      ) : (
        <div onClick={handlePasswordVisibility} className="form_reveal">
          <AiFillEye />
        </div>
      )}
      <Link to="/signin" className="link_account">
        Vous avez un compte ?
      </Link>
      <div className="signup_message">{userCreated.message}</div>
      <div className="signup_erreur">{erreur}</div>
    </div>
  );
}
