import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router-dom";
import "../../assets/CSS/Backoffice.css";

export default function Backoffice({ userExist, setUserExist }) {
  const [message, setMessage] = useState("");
  const prodUrl = import.meta.env.VITE_BACK_PROD_URL;
  const localUrl = import.meta.env.VITE_BACK_LOCAL_URL;
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
        return redirect("/");
      })
      .catch((err) => {});
  };

  return (
    <div className="backoffice_container">
      <div className="backoffice_title">
        <h2>Mon Backoffice</h2>
        <div>{userExist.logged}</div>
      </div>
      <button onClick={deleteMyAccount}>Supprimer mon compte</button>
      <div className="message">{message}</div>
    </div>
  );
}
