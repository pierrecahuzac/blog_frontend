import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import axios from "axios";
import Loading from "../Loading";
import "../../assets/CSS/articlePage.scss";

export default function ArticlePage() {
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const localUrl = import.meta.env.VITE_BACK_LOCAL_URL;
  let { articleId } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getOneArticle(articleId);
  }, []);

  const getOneArticle = async () => {
    await axios
      .get(`${prodUrl}/api/blog/${articleId}`)
      .then((res) => {
        setArticle(res.data.post);
      })
      .catch((err) => {});
  };

  return (
    <div className="article_container">
      <span>
        <Link to="/" className="back_to_articles_list">
          <AiOutlineRollback /> Retour à la liste des articles
        </Link>
      </span>
      <div className="article_element">
        <h2 className="article_title">{article.title}</h2>
        <div className="article_date">{article.Date}</div>
        <div className="article_id">{article.id}</div>
        <div className="article_img">
          {article.picture && (
            <img src={article.picture} alt={article.picture} />
          )}
        </div>
        <p className="article_content">{article.content}</p>
        <Link to={`/blog/user/${article.authorId}`}>
          <div className="article_user">{article.authorId}</div>
        </Link>
      </div>
    </div>
  );
}
