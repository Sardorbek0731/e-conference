import "./App.css";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import Articles from "./pages/articles/Articles";
import Article from "./pages/article/Article";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import ManageArticles from "./pages/manageArticles/ManageArticles";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/manage-articles" element={<ManageArticles />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
          <Route path="/error" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
