import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";
import emailValidator from "email-validator";
import { toast } from "react-toastify";

import { accountService } from "../../_services/account.service";

import "../../assets/CSS/signin.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { user, setUser } = useUserContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();
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

  const onSubmit = async () => {
    if (!user.password || !user.email) {
      setError(`Pas d'email ou de mot de passe`);
      return;
    }
    if (!emailValidator.validate(user.email)) {
      setError(`L'email entré n'est pas valide`);
      return;
    }

    try {
      const res = await axios.post(`${prodUrl}/api/user/login`, {
        email: user.email,
        password: user.password,
      });
      setUser({
        username: res.data.username,
        logged: true,
        userId: res.data.userId,
        email: res.data.email,
      });
      const token = accountService.getToken();
      console.log(token);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("id", res.data.userId);
      localStorage.setItem("logged", res.data.logged);
      setSuccess(res.data.success);
      toast.success("Login ok");
      navigate(`/profile/user/` + res.data.userId);
    } catch (err) {
      console.log(err);
      /*  setError(err.response.data.error); */
      toast.success("Erreur");
      return;
    }
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
      <button type="submit" onClick={onSubmit} className="btn_submit_account">
        Connexion
      </button>
      <Link to="/signup" className="link_account">
        Vous n'avez pas de compte ?
      </Link>

      {error && <div className="erreur">{error}</div>}
      {success && <div className="signup_success">{success}</div>}
    </div>
  );
}
