import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import { useUserContext } from "../../utils/userContext";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";

import "../../assets/CSS/signup.scss";
import { toast } from "react-toastify";

export default function Signup() {
  const { user, setUser } = useUserContext();
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [userCreated, setUserCreated] = useState({});
  const [error, setError] = useState();
  /* const [displayName, setDisplayName] = useSate(""); */
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
      toast.error(`Mot de passe incorrect`);
      errorsArray.push(`Mot de passe incorrect`);
      return;
    }
    if (!emailValidator.validate(user.email) || !user.email) {
      setError(`L'email n'est pas valide / est vide`);
      toast.error(`L'email n'est pas valide / est vide`);
      errorsArray.push(`L'email n'est pas valide / est vide`);
      return;
    }
    if (!user.username) {
      setError(`Nom d'utilisateur vide`);
      toast.error(`Nom d'utilisateur vide`);
      errorsArray.push(`entrer un nom d'utilisateur`);
      return;
    }
    if (!user.password) {
      setError(`Entrer un mot de passe`);
      toast.error(`Entrer un mot de passe`);
      errorsArray.push(`Entrer un mot de passe`);
      return;
    }
    if (!user.password_validation) {
      setError(`La validation du mot de passe est vide`);
      toast.error(`La validation du mot de passe est vide`);
      errorsArray.push(`La validation du mot de passe est vide`);
      return;
    }
    if (user.password_validation !== user.password) {
      setError(`Les mots de passe doivent être identiques`);
      toast.error(`Les mots de passe doivent être identiques`);
      errorsArray.push(`Les mots de passe doivent être identiques`);
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
      navigate(`/profile/user/${response.data.user.id}`);
      setSucess(response.data.sucess);
      toast.success(`Compté crée avec succès pour ${user.username}`);
    } catch (err) {
      setError(err.response.data.error);
      toast.error(err.response.data.error);
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
