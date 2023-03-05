import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../../utils/userContext";

import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";
import "../../assets/CSS/articlesList.scss";

export default function UserArticlesPage({ userExist }) {
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const [loading, setLoading] = useState(true);
  const [postsArray, setPostsArray] = useState([]);
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  useEffect(() => {
    setLoading(true);
    getAllPostsFromUser(user.id);
  }, []);

  const getAllPostsFromUser = async () => {
    await axios
      .get(`${prodUrl}/api/blog/user/${id}`)
      .then((res) => {
        /*   console.log(res.data.postsUser); */
        setPostsArray(res.data.postsUser);
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
      <Link to={`/blog/${id}`}>
        <button>back to user posts page</button>
      </Link>
      {loading && <Loading />}
      {!loading &&
        postsArray.map((post) => (
          <div
            className="article"
            key={post.id}
            id={post.id}
            onClick={getArticleId}
          >
            <div>
              <Link to={`/blog/${post.id}`}>
                <div className="img-container">
                  <img
                    src={post.url}
                    alt={post.url}
                    className="article-picture"
                    key={post.url}
                  />
                </div>
                <h2 className="article-title">{post.title}</h2>
                <p className="article-content">{post.content}</p>
              </Link>
            </div>
            <p className="article-createdTime">{post.createdTime}</p>
          </div>
        ))}
    </div>
  );
}
