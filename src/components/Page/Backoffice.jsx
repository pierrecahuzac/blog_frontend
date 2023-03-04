import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useParams } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";
import CreateNewPost from "../CreateNewPost";
import "../../assets/CSS/Backoffice.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Backoffice() {
  useEffect(() => {
    if (!user.logged) {
      console.log("utilisateur non reconnu, redirection vers l'accueil");
      return redirect("/");
    }
  }, []);
  const { user, setUser } = useUserContext();
  const [myPosts, setMyPosts] = useState([]);
  const [createNewPostModalIsOpen, setCreateNewPostModalIsOpen] =
    useState(false);

  const [message, setMessage] = useState("");

  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;

  useEffect(() => {
    getMyPosts();
  }, []);
  const notify = () => toast(`Votre compte a été supprimé`);

  // récupérer les posts de l'user
  const getMyPosts = async () => {
    await axios
      .get(`${prodUrl}/api/blog/user/${user.userId}`)
      .then((res) => {
        setMyPosts(res.data.postsUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createNewpost = async () => {
    setCreateNewPostModalIsOpen(true);
  };

  const deleteMyAccount = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${prodUrl}/api/user/${userId}/deleteAccount`, {
        email: user.email,
        userId: user.userID,
      })
      .then((res) => {
        setMessage(res.data.message);
        notify(`Votre compte a été supprimé`);
        setUser(!user.logged);
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
          user={user}
          setUser={setUser}
        />
      )}
      <div className="backoffice_title">
        <h2>Mon Backoffice</h2>
      </div>
      <div>
        <button onClick={deleteMyAccount} className="btn_delete_account">
          Supprimer mon compte
        </button>
        <button onClick={createNewpost} className="btn_create_new_post">
          Créer un nouveau post
        </button>
      </div>

      <div className="message">{message}</div>
      <h2> Mes posts </h2>
      <div className="my_posts">
        {myPosts.map((post) => (
          <div className="article" key={post.id} id={post.id}>
            <div className="article-container">
              <div className="img-container">
                {post.picture && (
                  <img
                    src={post.picture}
                    alt={post.picture}
                    className="article-picture"
                    key={post.picture}
                  />
                )}
              </div>
              <h2 className="article-title">{post.title}</h2>

              <p className="article-content">{post.content}</p>
              <p className="article-createdTime">{post.createdAt}</p>

              <button
                className="article-delete_article_btn"
                onClick={deletePost}
              >
                Supprimer ce post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
