import axios from "axios";
import validUrl from "valid-url";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../utils/userContext";

import AOS from "aos";
import "../assets/CSS/createNewPostModal.scss";
import "../assets/CSS/reactquill.scss";
import "react-quill/dist/quill.snow.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

export default function CreateNewPost({
  createNewPostModalIsOpen,
  setCreateNewPostModalIsOpen,
}) {
  useEffect(() => {
    AOS.init();
  });
  const { user, setUser } = useUserContext();
  const prodUrl = import.meta.env.VITE_PROD_URL;
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState();
  const [newPostURL, setNewPostURL] = useState("");

  const onInputTitleChange = (e) => {
    e.preventDefault();
    setNewPostTitle(e.target.value);
  };

  const onInputContentChange = (e) => {
    e.preventDefault();

    setNewPostContent(e.target.value);
  };
  const onInputImgURLChange = (e) => {
    e.preventDefault();
    setNewPostURL(e.target.value);
  };

  const onSubmitNewpost = async (e) => {
    e.preventDefault();
    if (!validUrl.isUri(newPostURL)) {
      toast.error(`URL de l'image incorrecte`);
      return;
    }
    if (!newPostTitle) {
      toast.error(`Titre de l'article vide`);
      return;
    }
    if (!newPostContent) {
      toast.error(`Contenu de l'article vide`);
      return;
    }
    try {
      await axios.post(`${prodUrl}/api/user/createNewPost`, {
        newPostTitle,
        newPostContent,
        newPostURL,
        email: user.email,
        userID: user.userID,
        createdBy: user.username,
        username: user.username,
      });
      console.log(response.data);
      setArticleCount(articleCount + 1);
      setCreateNewPostModalIsOpen(false);
      toast.success(`Article créé avec succès`);
      return;
    } catch (err) {}
  };

  return (
    <div
      data-aos="zoom-in"
      className={
        createNewPostModalIsOpen
          ? "create_new_post__container-modal_is_open"
          : "create_new_post__container"
      }
    >
      <form action="submit" className="create_new_post__form">
        <input
          type="text"
          placeholder="Titre de l'article"
          className="create_new_post__form-input_title"
          value={newPostTitle}
          onChange={onInputTitleChange}
        />
        {/*   <ReactQuill
           className="rich-text-editor_container" 
          value={newPostContent}
          onChange={onInputContentChange}
        /> */}
        <input
          type="text"
          placeholder="Contenu de l'article"
          className="create_new_post__form-input_content"
          value={newPostContent}
          onChange={onInputContentChange}
        />

        <input
          type="text"
          placeholder="URL de l'image de l'article"
          className="create_new_post__form-input_img"
          value={newPostURL}
          onChange={onInputImgURLChange}
        />
        <button
          type="submit"
          onClick={onSubmitNewpost}
          className="create_new_post__form-btn_submit_new_post"
        >
          Créer le nouvel article
        </button>
      </form>
      <span
        className="close-modal"
        onClick={(e) => {
          e.preventDefault();
          setCreateNewPostModalIsOpen(false);
        }}
      >
        X
      </span>
    </div>
  );
}
