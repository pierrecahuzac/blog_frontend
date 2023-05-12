import { useState, useEffect } from "react";
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
    try {
      const response = await fetch(`${prodUrl}/api/blog`, {
        method: "GET",
      });
      const res = await response.json();
      console.log(res);

      console.log(res.posts);
      setArticlesList(res.posts);
      setLoading(false);
      return response.data.posts;
    } catch (err) {
      return;
    }
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
            author={article.author}
            key={article.id}
            username={article.author.username}
          />
        ))}
    </div>
  );
}
