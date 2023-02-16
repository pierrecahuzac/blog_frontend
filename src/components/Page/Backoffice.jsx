import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useParams } from "react-router-dom";
import CreateNewPost from "../CreateNewPost";
import "../../assets/CSS/Backoffice.css";
import "react-toastify/dist/ReactToastify.css";

export default function Backoffice({ userExist, setUserExist }) {
  const [myPosts, setMyPosts] = useState([]);
  const [createNewPostModalIsOpen, setCreateNewPostModalIsOpen] =
    useState(false);

  const [message, setMessage] = useState("");

  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const localUrl = import.meta.env.VITE_BACK_LOCAL_URL;

  useEffect(() => {
    getMyPosts();
  }, []);
  const notify = () => toast(`Votre compte a été supprimé`);
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
    setCreateNewPostModalIsOpen(true);
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
        notify(`Votre compte a été supprimé`);
        setUserExist(!userExist.logged);
        redirect("/");
      })
      .catch((err) => {});
  };

  const deletePost = async (evt) => {
    const articleId = evt.target.id;

    await axios
      .delete(`${prodUrl}/user/${articleId}`, {
        articleId,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {});
  };

  return (
    <div className="backoffice_container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {createNewPostModalIsOpen && (
        <CreateNewPost
          createNewPostModalIsOpen={createNewPostModalIsOpen}
          setCreateNewPostModalIsOpen={setCreateNewPostModalIsOpen}
          userExist={userExist}
          setUserExist={setUserExist}
        />
      )}
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
