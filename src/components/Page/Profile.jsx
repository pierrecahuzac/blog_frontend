import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useParams } from "react-router-dom";
import { useUserContext } from "../../utils/userContext";
import Post from "../Post";
import CreateNewPost from "../CreateNewPost";
import "../../assets/CSS/profile.scss";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
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

  const prodUrl = import.meta.env.VITE_PROD_URL;

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
      .delete(`${prodUrl}/api/user/${user.userId}/deleteAccount`, {
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

  const deletePost = async (e) => {
    const articleId = e.target.dataset.id;
    console.log(articleId);
    try {
      const res = await fetch(`${prodUrl}/api/post/${articleId}`, {
        method: "DELETE",
        body: articleId,
      });
      console.log(res);
      setMessage(res.data.message);
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div className="profile_container">
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
          key={user}
        />
      )}
      <div className="profile_title">
        <h2>Mon compte</h2>
      </div>
      <div className="btn_container">
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
          <div className="post_container">
            <Post
              id={post.id}
              title={post.title}
              filename={post.filename}
              picture={post.picture}
              content={post.content}
              createdAt={post.createdAt}
              value={post.id}
              key={post.id}
            />
            <button
              className="btn_delete_post"
              data-id={post.id}
              onClick={deletePost}
            >
              Supprimer ce post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
