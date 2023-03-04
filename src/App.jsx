import { useState } from "react";
import { useDarkModeContext } from "./utils/darkModeContext";
import { useUserContext } from "./utils/userContext";
import { useGlobalContext } from "./utils/globalContext";

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
import Signin from "./components/Page/Signin";
import Error from "./components/Page/Error.jsx";
import ArticlePage from "./components/Page/ArticlePage.jsx";
import UserArticlesPage from "./components/Page/UserArticlesPage.jsx";
import Backoffice from "./components/Page/Backoffice";
import "./assets/CSS/App.scss";

export default function App() {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();
  const { user, setUser } = useUserContext();

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "App--dark" : "App"}>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="blog/:articleId" element={<ArticlePage />} />
          <Route
            path="/blog/user/:id"
            element={<UserArticlesPage />}
            user={user.username}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/backoffice/user/:userId"
            element={user.logged ? <Backoffice /> : <Link to="/" />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>{" "}
    </BrowserRouter>
  );
}
