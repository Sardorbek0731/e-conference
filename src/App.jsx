// CSS
import "./App.css";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Pages
import Main from "./pages/main/Main";
import Articles from "./pages/articles/Articles";
import Article from "./pages/article/Article";

// React Router DOM
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="/articles/*" element={<Article />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
