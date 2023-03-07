import axios from "axios";
import validUrl from "valid-url";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from "./Toast";
import { useUserContext } from "../utils/userContext";

import AOS from "aos";
import "../assets/CSS/createNewPostModal.scss";
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
  const [newPostContent, setNewPostContent] = useState("");
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
      errorToast(`URL de l'image incorrecte`);
      return;
    }
    if (!newPostTitle) {
      errorToast(`Titre de l'article vide`);
      return;
    }
    if (!newPostContent) {
      errorToast(`Contenu de l'article vide`);
      return;
    }
    await axios
      .post(`${prodUrl}/api/user/createNewPost`, {
        newPostTitle,
        newPostContent,
        newPostURL,
        email: user.email,
        userID: user.userID,
        createdBy: user.username,
        username: user.username,
      })
      .then((res) => {
        successToast("Post crée avec succès : ", res);
        setCreateNewPostModalIsOpen(false);
      })
      .catch((err) => {});
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
        theme="light"
      />

      <form action="submit" className="create_new_post__form">
        <input
          type="text"
          placeholder="Titre de l'article"
          className="create_new_post__form-input_title"
          value={newPostTitle}
          onChange={onInputTitleChange}
        />
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
      <button
        onClick={(e) => {
          e.preventDefault();
          setCreateNewPostModalIsOpen(false);
        }}
      >
        X
      </button>
    </div>
  );
}
