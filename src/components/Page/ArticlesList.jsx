import { useState, useEffect } from "react";
import axios from "axios";

import { useParams, Link } from "react-router-dom";

import Loading from "../Loading";

import "../../assets/CSS/articlesList.css";

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    setLoading(true);
    getArticles();
  }, []);
  const [loading, setLoading] = useState(true);
  const getArticles = async () => {
    const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
    await axios
      .get(`${prodUrl}/api/blog`)
      .then((res) => {
        setArticlesList(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getArticleId = (e) => {
    const articleId = e.target.title;
  };

  return (
    <div className="articles-list">
      {loading && <Loading />}
      {!loading &&
        articlesList.map((article) => (
          <div
            className="article"
            key={article.id}
            id={article.id}
            onClick={getArticleId}
          >
            <Link to={`/blog/${article.id}`}>
              <div className="img-container">
                <img
                  src={article.picture}
                  alt={article.filename}
                  className="article-picture"
                  key={article.picture}
                />
              </div>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-content">{article.content}</p>
              <p className="article-content">{article.createdAt}</p>
            </Link>
            <p className="article-createdTime">{article.user}</p>
          </div>
        ))}
    </div>
  );
}
