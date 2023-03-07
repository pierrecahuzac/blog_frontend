import { useState, useEffect } from "react";
import axios from "axios";

import Post from "../Post";
import Loading from "../Loading";

import "../../assets/CSS/articlesList.scss";

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    getArticles();
  }, []);
  const [loading, setLoading] = useState(true);
  const getArticles = async () => {
    const prodUrl = import.meta.env.VITE_PROD_URL;
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
          <Post
            id={article.id}
            title={article.title}
            filename={article.filename}
            picture={article.picture}
            content={article.content}
            createdAt={article.createdAt}
            user={article.user}
            articleId
            key={article.id}
          />
        ))}
    </div>
  );
}
