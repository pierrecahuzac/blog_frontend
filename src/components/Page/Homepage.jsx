import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/homepage.scss";
export default function Homepage() {
  useEffect(() => {
    wakeupServer();
  }, []);

  const wakeupServer = async () => {
    const prodUrl = import.meta.env.VITE_PROD_URL;
    try {
      const response = await fetch(`${prodUrl}`);
      if (!response.ok) {
        console.log(response.ok);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

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
}
