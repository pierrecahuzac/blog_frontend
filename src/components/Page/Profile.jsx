import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../utils/userContext";
import Post from "../Post";
import CreateNewPost from "../CreateNewPost";
import Loading from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/CSS/profile.scss";

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    getMyPosts();
    if (!user.logged) {
      toast.error("utilisateur non reconnu, redirection vers l'accueil");
      return navigate("/");
    }
  }, [myPosts]);
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);

  const [createNewPostModalIsOpen, setCreateNewPostModalIsOpen] =
    useState(false);

  const [message, setMessage] = useState("");

  const prod_url = import.meta.env.VITE_PROD_URL;

  // récupérer les posts de l'user
  const getMyPosts = async () => {
    try {
      const response = await fetch(`${prod_url}/api/blog/user/${user.userId}`);
      const data = await response.json();
      if (!data.postsUser.length) {
        setLoading(false);
        toast.error("Pas de post pour cet utilisateur");
        return data;
      }
      setMyPosts(data.postsUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewpost = async () => {
    setCreateNewPostModalIsOpen(true);
  };

  const deleteMyAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${prod_url}/api/user/${user.userId}/deleteAccount`,
        {
          method: "DELETE",
          email: user.email,
          userId: user.userID,
        }
      );
      const response = await res.json();
      console.log(response.success);
      toast.success("Utilisateur supprimé");
      setMessage(response.sucess);
      navigate("/");
      setUser("");
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const articleId = e.target.dataset.id;
    try {
      const res = await axios.delete(`${prod_url}/api/post/${articleId}`, {
        id: articleId,
      });
      const response = await res.json();
      console.log(response);
      setMessage(res.data.message);

      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div className="profile_container">
      {loading && <Loading />}

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
        <h3>{user.email}</h3>
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
            {!loading && (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                filename={post.filename}
                picture={post.picture}
                content={post.content}
                createdAt={post.createdAt}
                value={post.id}
              />
            )}
            <button
              type="button"
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
