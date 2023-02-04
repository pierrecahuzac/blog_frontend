import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

export default function Article() {
  let { articleId } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    console.log("ici");
    getOneArticle(articleId);
  }, []);

  const key = "key6ZEfp9OsaM87yC";
  const getOneArticle = async () => {
    await axios
      .get(
        `https://api.airtable.com/v0/appRPd2FdRXZZchOs/article/${articleId}?api_key=${key}`
      )
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
        /*      setLoading(false); */
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>{articleId}</div>
      <div>{article.id}</div>
    </div>
  );
}
