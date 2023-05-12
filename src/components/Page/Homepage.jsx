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
      {/*       <h1 className="homepage_title">Bienvenu(e) sur le blog du dev</h1>
       */}{" "}
      <div className="homepage_menu">
        <p className="homepage_links">
          Pour consulter la liste des articles, allez sur le rubrique
          <Link to="/blog"> BLOG</Link>
        </p>
        <p className="homepage_links">
          Pour vous incrire, direction
          <Link to="/signup"> S'INSCRIRE</Link>
        </p>
        <p className="homepage_links">
          Si vous avez déjà un compte, <Link to="/signup"> SE CONNECTER</Link>
        </p>
      </div>
    </div>
  );
}
