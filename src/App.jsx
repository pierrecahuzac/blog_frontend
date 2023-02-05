import { useState } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import ArticlesList from "./components/Page/ArticlesList";
import Header from "./components/Header";
import Homepage from "./components/Page/Homepage";
import SignUp from "./components/Page/SignUp";
import Signin from "./components/Page/Signin";
import Error from "./components/Page/Error.jsx";
import ArticlePage from "./components/Page/ArticlePage.jsx";
import Backoffice from "./components/Page/Backoffice";
import "./assets/CSS/App.css";

export default function App() {
  const [userExist, setUserExist] = useState({
    email: "",
    display_name: "",
    logged: "",
    userId: "",
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Header userExist={userExist} setUserExist={setUserExist} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="blog/:articleId" element={<ArticlePage />} />
          <Route path="/blog" element={<ArticlesList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/user/:userId/backoffice"
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
