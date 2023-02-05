import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import axios from "axios";
import Loading from "../Loading";
import "../../assets/CSS/articlePage.css";

export default function ArticlePage() {
  let { articleId } = useParams();
  console.log({ articleId });
  const [article, setArticle] = useState([]);

  useEffect(() => {
    console.log("ici");
    getOneArticle(articleId);
  }, []);

  const getOneArticle = async () => {
    await axios
      .get(`http://localhost:5000/blog/${articleId}`)
      .then((res) => {
        console.log(res.data.article.fields);
        setArticle(res.data.article.fields);
        /*      setLoading(false); */
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="article_container">
      <span>
        <Link to="/blog" className="back_to_articles_list">
          <AiOutlineRollback /> Retour à la liste des articles
        </Link>
      </span>
      <div className="article_element">
        <div className="article_date">{article.Date}</div>
        <h2 className="article_title">{article.title}</h2>
        <div className="article_id">{article.id}</div>
        <div className="article_img">
          {article.picture ? (
            <img src={article.picture.map((elem) => elem.url)} alt="" />
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
        <p className="article_content">{article.content}</p>
        <div className="article_user">{article.user}</div>
      </div>
    </div>
  );
}
