import axios from "axios";
import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";
import "../../assets/CSS/articlesList.css";

export default function UserArticlesPage({ userExist }) {
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const [loading, setLoading] = useState(true);
  const [postsArray, setPostsArray] = useState([]);
  const { displayName } = useParams();

  useEffect(() => {
    setLoading(true);
    getAllPostsFromUser();
  }, []);

  const getAllPostsFromUser = async () => {
    await axios
      .get(`${prodUrl}/blog/user/${displayName}`)
      .then((res) => {
        setPostsArray(res.data.result);
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
      {/*   <Link to={`/blog/${displayName}`}>
        <button>back to user posts page</button>
      </Link> */}

      {loading && <Loading />}
      {!loading &&
        postsArray.map((article) => (
          <div
            className="article"
            key={article.id}
            id={article.id}
            onClick={getArticleId}
          >
            {article.fields ? (
              <div>
                <Link to={`/blog/${article.id}`}>
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
                </Link>
              </div>
            ) : (
              ""
            )}
            <p className="article-createdTime">{article.createdTime}</p>
          </div>
        ))}
    </div>
  );
}
