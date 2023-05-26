import { useEffect, useState } from "react";
import { useUserContext } from "./utils/userContext";
import { useGlobalContext } from "./utils/globalContext";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import ArticlesList from "./components/Page/ArticlesList";
import Header from "./components/Header";
import SignUp from "./components/Page/SignUp";
import Login from "./components/Page/Login";
import Error from "./components/Page/Error.jsx";
import Homepage from "./components/Page/Homepage.jsx";
import ArticlePage from "./components/Page/ArticlePage.jsx";
import UserArticlesPage from "./components/Page/UserArticlesPage.jsx";
import Profile from "./components/Page/Profile";
import "react-toastify/dist/ReactToastify.css";
import "./assets/CSS/App.scss";

export default function App() {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();
  const { user, setUser } = useUserContext();

  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <div className={isDarkMode ? "App--dark" : "App"}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<ArticlesList />} />
          <Route path="/blog/:articleId" element={<ArticlePage />} />
          <Route path="/blog/user" element={<Error />} />
          <Route
            path="/blog/user/:username"
            element={<UserArticlesPage />}
            user={user.username}
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile/user/:userId"
            element={user.logged ? <Profile /> : <Link to="/" />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}
