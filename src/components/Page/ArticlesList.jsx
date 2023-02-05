import { useState, useEffect } from "react";
import axios from "axios";

import { useParams, Link } from "react-router-dom";

import Loading from "../Loading";

import "../../assets/CSS/articlesList.css";

export default function ArticlesList() {
  useEffect(() => {
    setLoading(true);
    getArticles();
  }, []);

  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    await axios
      .get(`http://localhost:5000/blog`)
      .then((res) => {
        setArticlesList(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticleId = (e) => {
    const articleId = e.target.title;
    console.log(articleId);
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
            {article.fields ? (
              <Link to={`/blog/${article.id}`}>
                <div>
                  {/*  <p className="card__informations__footer">Plus d'infos...</p>{" "} */}

                  {article.fields.picture && (
                    <div className="img-container">
                      {article.fields.picture.map((img) => (
                        <img
                          src={img.url}
                          alt={img.filename}
                          className="article-picture"
                          key={img.filename}
                        />
                      ))}
                    </div>
                  )}
                  <h2 className="article-title">{article.fields.title}</h2>
                  <p className="article-content">{article.fields.content}</p>
                </div>
              </Link>
            ) : (
              ""
            )}

            <p className="article-createdTime">{article.createdTime}</p>
            {/*  <Link to={`/blog/${articleId}`}>Plus d'infos...</Link> */}
          </div>
        ))}
    </div>
  );
}
