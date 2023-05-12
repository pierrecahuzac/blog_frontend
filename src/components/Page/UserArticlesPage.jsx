import { useState, useEffect } from "react";
import { useUserContext } from "../../utils/userContext";

import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";
import "../../assets/CSS/articlesList.scss";

export default function UserArticlesPage() {
  const prodUrl = import.meta.env.VITE_PROD_URL;
  const [loading, setLoading] = useState(true);
  const [postsArray, setPostsArray] = useState([]);
  const { username } = useParams();
  const { user, setUser } = useUserContext();
  useEffect(() => {
    setLoading(true);
    getAllPostsFromUser(user.id);
  }, []);

  const getAllPostsFromUser = async () => {
    try {
      const response = await fetch(`${prodUrl}/api/blog/user/${username}`, {
        method: "GET",
      });

      const res = await response.json();
      console.log(res.postsUser);
      setPostsArray(res.postsUser);

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getArticleId = (e) => {
    const articleId = e.target.title;
  };

  return (
    <div className="articles-list">
      <Link to={`/blog`}>
        <button>Back to posts </button>
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
                    src={post.picture}
                    alt={post.picture}
                    className="article-picture"
                    key={post.picture}
                  />
                </div>
                <h2 className="article-title">{post.title}</h2>
                <p className="article-content">{post.content}</p>
              </Link>
            </div>
            <p className="article-createdTime">{post.createdAt}</p>
          </div>
        ))}
    </div>
  );
}
