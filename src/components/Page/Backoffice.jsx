import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import "../../assets/CSS/Backoffice.css";

export default function Backoffice({ userExist, setUserExist }) {
  const [myPosts, setMyPosts] = useState([]);
  const [createNewPost, setCreateNewpost] = useState({
    title: "nouveau post",
    content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda provident, facilis ab tempore eos, dicta dolores voluptates veniam cum minima architecto. Velit perferendis libero, nostrum ullam neque eum quae eius.
Facilis, itecto deleniti cum commodi atque laborum unde.Odio alias sapiente laboriosam ab totam iste sunt voluptas illum voluptate, aut pariatur quo aliquam quia nisi maiores eos! Excepturi suscipit perferendis iure, tempora repudiandae cumque ullam doloremque ad architecto`,
    createdBy: userExist.display_name,
    picture:
      "https://cdn.dribbble.com/users/246068/screenshots/10493400/media/1b1c6d5b0c0d85e7c6db45b75445641e.gif",
    date: "",
  });
  const [message, setMessage] = useState("");

  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const localUrl = import.meta.env.VITE_BACK_LOCAL_URL;

  useEffect(() => {
    /*  setLoading(true); */
    getMyPosts();
  }, []);

  const getMyPosts = async () => {
    await axios
      .get(`${prodUrl}/blog/user/${userExist.display_name}`)
      .then((res) => {
        setMyPosts(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createNewpost = async () => {
    await axios
      .post(`${prodUrl}/user/createNewPost`, {
        createNewPost,
        userExist,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMyAccount = async (e) => {
    const userId = userExist.userId;
    const userEmail = userExist.email;
    e.preventDefault();
    await axios
      .delete(`${prodUrl}/user/${userId}/deleteAccount`, {
        userEmail,
        userId,
      })
      .then((res) => {
        setMessage(res.data.message);
        setUserExist(!userExist.logged);
        redirect("/");
      })
      .catch((err) => {});
  };

  const deletePost = async (evt) => {
    const articleId = evt.target.id;
    console.log(articleId);
    await axios
      .delete(`${prodUrl}/user/${articleId}`, {
        articleId,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="backoffice_container">
      <div className="backoffice_title">
        <h2>Mon Backoffice</h2>

        <div>{userExist.display_name}</div>
        <div>{userExist.logged}</div>
      </div>
      <button onClick={deleteMyAccount} className="btn_delete_account">
        Supprimer mon compte
      </button>
      <button onClick={createNewpost} className="btn_create_new_post">
        Créer un nouveau post
      </button>
      <div className="message">{message}</div>
      <h2> Mes posts </h2>
      <div className="my_posts">
        {myPosts.map((article) => (
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
                  </div>
                )}
                <h2 className="article-title">{article.fields.title}</h2>
                <p className="article-content">{article.fields.content}</p>
                <span onClick={deletePost}> Supprimer ce post</span>
              </div>
            ) : (
              ""
            )}
            <p className="article-createdTime">{article.createdTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
