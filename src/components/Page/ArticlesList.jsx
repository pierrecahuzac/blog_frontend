import { useState, useEffect } from "react";
import axios from "axios";

import Post from "../Post";
import Loading from "../Loading";

import "../../assets/CSS/articlesList.scss";

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    getArticles();
    console.log(articlesList);
  }, []);
  const [loading, setLoading] = useState(true);
  const getArticles = async () => {
    const prodUrl = import.meta.env.VITE_PROD_URL;
    try {
      const response = await axios.get(`${prodUrl}/api/blog`);
      console.log(response.data.posts);
      setArticlesList(response.data.posts);
      setLoading(false);
      return response.data.posts;
    } catch (err) {
      console.log(err);
      return;
    }
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
            /*  username={article.author.username} */
          />
        ))}
    </div>
  );
}
