import { useState } from "react";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import { useUserContext } from "../../utils/userContext";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";

import "../../assets/CSS/signup.scss";

export default function SignUp() {
  const { user, setUser } = useUserContext();
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password_validation, setPasswordValidation] = useState("");
  const [userCreated, setUserCreated] = useState({});
  const [error, setError] = useState();
  const [sucess, setSucess] = useState();
  const navigate = useNavigate();
  const handlePasswordVisibility = () => {
    setPasswordReveal(!passwordReveal);
  };
  const changeEmail = (e) => {
    setError("");

    setUser({ ...user, email: e.target.value });
  };
  const changeDisplayName = (e) => {
    setError("");

    setDisplayName(e.target.value);
    setUser({ ...user, username: e.target.value });
  };
  const changePassword = (e) => {
    setError("");

    setUser({ ...user, password: e.target.value });
  };
  const changePasswordValidation = (e) => {
    setError("");

    setUser({ ...user, password_validation: e.target.value });
  };
  const prodUrl = import.meta.env.VITE_PROD_URL;

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
      setError(`Mot de passe incorrect`);
      errorsArray.push(`Mot de passe incorrect`);
      return;
    }
    if (!emailValidator.validate(user.email) || !user.email) {
      setError(`L'email n'est pas valide / est vide`);
      errorsArray.push(`L'email n'est pas valide / est vide`);
      return;
    }
    if (!user.password) {
      setError(`entrer un mot de passe`);
      errorsArray.push(`entrer un mot de passe`);
      return;
    }
    if (!user.password_validation) {
      setError(`la validation du mot de passe est vide`);
      errorsArray.push(`la validation du mot de passe est vide`);
      return;
    }
    if (user.password_validation !== user.password) {
      setError(`les mots de passe doivent être identiques`);
      errorsArray.push(`les mots de passe doivent être identiques`);
      return;
    }
    if (errorsArray.length) {
      errorsArray.forEach((err) => console.log(err));
      setError(errorsArray);
      return;
    }
    try {
      const response = await axios.post(`${prodUrl}/api/user/create_user`, {
        email: user.email,
        password: user.password,
        password_validation: user.password_validation,
        username: user.username,
      });
      setUserCreated(response.data);
      console.log(response.data.user.id);
      navigate(`/profile/user/${user.userId}`);
      setSucess(response.data.sucess);
    } catch (err) {
      setError(err.response.data.error);
    }
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
          <div className="form_input_username">
            <input
              type="text"
              className="form_input"
              value={user.username}
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
      {error && <div className="signup_erreur">{error}</div>}
      {sucess && <div className="signup_sucess">{sucess}</div>}
    </div>
  );
}
