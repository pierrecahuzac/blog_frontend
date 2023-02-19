import { useState } from "react";
import { UseDarkModeContext } from "./utils/darkModeContext";
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
  const { isDarkMode, setIsDarkMode } = UseDarkModeContext();
  const [userExist, setUserExist] = useState({
    email: "",
    display_name: "",
    logged: "",
    userId: "",
  });
  return (
    <BrowserRouter>
      <div className={isDarkMode ? "App--dark" : "App"}>
        <Header userExist={userExist} setUserExist={setUserExist} />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="blog/:articleId" element={<ArticlePage />} />
          <Route
            path="/blog/user/:displayName"
            element={<UserArticlesPage />}
            userExist={userExist}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/backoffice/user/:userId"
            element={
              userExist.logged ? (
                <Backoffice userExist={userExist} setUserExist={setUserExist} />
              ) : (
                <Link to="/" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              <Signin userExist={userExist} setUserExist={setUserExist} />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
