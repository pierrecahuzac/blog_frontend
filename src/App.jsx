import { useState } from "react";

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";
import Error from "./components/Error.jsx";
import Article from "./components/Article.jsx";
import Backoffice from "./components/backoffice";
import "./assets/CSS/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="blog/:articleId" element={<Article />} />
          <Route path="/blog" element={<ArticlesList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Error />} />
          <Route path="/backoffice" element={<Backoffice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
