import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";
import { useUserContext } from "../../utils/userContext";
import { toast } from "react-toastify";
import "../../assets/CSS/homepage.scss";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../_services/caller.service";
const Homepage = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionId"),
      },
    };
    const sessionId = async () => {
      try {
        const res = await axios.get("http://localhost:5000/check-auth", config);
        if (res.data.logged) {
          console.log("Utilisateur authentifié");
          setUser({ logged: true });
        } else {
          console.log("Utilisateur non authentifié");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        );
      }
      const wakeupServer = async () => {
        const prodUrl = import.meta.env.VITE_PROD_URL;
        try {
          const response = await fetch(`${prodUrl}`);

          if (!response.ok) {
            return;
          }
        } catch (e) {
          console.log(e);
        }
      };
      sessionId();
      wakeupServer();
      if (user.logged === true) {
        toast.success("Vous êtes connecté(e) en tant que " + user.username);
      } else {
        toast.error("Vous n'êtes pas connecté(e)");
      }
    };
  }, []);

  return (
    <div className="homepage">
      <div className="homepage_menu">
        <p className="homepage_links">
          Pour consulter la liste des articles, allez sur le rubrique
          <Link to="/blog">
            <span className="home-links">BLOG</span>{" "}
          </Link>
        </p>
        <p className="homepage_links">
          Pour vous incrire, direction
          <Link to="/signup">
            <span className="home-links">S'INSCRIRE</span>{" "}
          </Link>
        </p>
        <p className="homepage_links">
          Si vous avez déjà un compte
          <Link to="/signin">
            <span className="home-links">SE CONNECTER</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Homepage;
