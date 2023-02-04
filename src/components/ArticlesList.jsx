/* "use strict"; */
/* require("dotenv").config(); */
import { useState, useEffect } from "react";
import axios from "axios";

import Article from "./Article";
import Loading from "./Loading";

import "../assets/CSS/articlesList.css";
const ArticlesList = () => {
  useEffect(() => {
    setLoading(true);
    getArticles();
  }, []);

  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKEy = import.meta.env.VITE_API_KEY;
  const localURL = import.meta.env.VITE_LOCAL_BACK_URL;
  const prodURL = import.meta.env.VITE_PROD_BACK_URL;
  const appID = import.meta.env.VITE_APP_ID;

  const getArticles = async () => {
    await axios
      .get(`http://localhost:5000/blog`, {
        /*   headers: {
          Authorization: `Bearer ${apiKEy}`,
        }, */
      })

      .then((res) => {
        setArticlesList(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*   const dateNow = () => {
    Date.now();
  }; */
  const createArticles = async () => {
    await axios
      .post(
        `https://api.airtable.com/v0/appRPd2FdRXZZchOs/article?api_key=key6ZEfp9OsaM87yC`
      )
      .then((res) => {
        console.log(res.data.records);
        setArticlesList(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="articles-list">
      {loading && <Loading />}

      {!loading &&
        articlesList.map((article) => (
          <div className="article" key={article.id} id={article.id}>
            {article.fields ? (
              <div>
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
                    {article.fields.email ? <div>email</div> : ""}
                  </div>
                )}
                <h2 className="article-title">{article.fields.title} </h2>{" "}
                <div className="article-content">{article.fields.content}</div>
              </div>
            ) : (
              ""
            )}

            <p className="article-createdTime">{article.createdTime}</p>
          </div>
        ))}
      <div>
        <button onClick={createArticles}>creer un article</button>
      </div>
    </section>
  );
};

export default ArticlesList;
