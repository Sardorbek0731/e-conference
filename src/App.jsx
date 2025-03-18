// CSS
import "./App.css";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Pages
import Main from "./pages/main/Main";
import Articles from "./pages/articles/Articles";
import Article from "./pages/article/Article";
import Login from "./pages/login/Login";
import ManageArticles from "./pages/manageArticles/ManageArticles";

// React Router DOM
import { BrowserRouter, Routes, Route } from "react-router-dom";

// React Hooks
import { useEffect, useState } from "react";

// Methods
import { getArticles } from "./services/articleService";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setData(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/articles" element={<Articles data={data} />} />
          <Route path="/articles/*" element={<Article data={data} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-articles" element={<ManageArticles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
