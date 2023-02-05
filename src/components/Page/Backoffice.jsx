import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router-dom";
import "../../assets/CSS/Backoffice.css";

export default function Backoffice({ userExist, setUserExist }) {
  const [message, setMessage] = useState("");

  const deleteMyAccount = async (e) => {
    const userId = userExist.userId;
    const userEmail = userExist.email;

    e.preventDefault();
    await axios
      .delete(`http://localhost:5000/user/${userId}/deleteAccount`, {
        userEmail,
        userId,
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        return redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
