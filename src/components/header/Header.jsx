// CSS
import "./Header.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Images
import logo from "../../assets/logo/logo.png";

// Icons
import home from "../../assets/icons/home.png";
import info from "../../assets/icons/info.png";
import news from "../../assets/icons/news.png";
import contact from "../../assets/icons/contact.png";
import arxiv from "../../assets/icons/arxiv.png";
import editorial from "../../assets/icons/editorial.png";

function Header() {
  return (
    <header className="container">
      <NavLink to={"/"} className="logo">
        <img src={logo} alt="Logo Icon" />
      </NavLink>

      <nav>
        <NavLink to="/">
          <img src={home} alt="Home Icon" />
          <h1>Bosh sahifa</h1>
        </NavLink>
        <NavLink to="/">
          <img src={info} alt="Informations Icon" />
          <h1>Ma'lumotlar</h1>
        </NavLink>
        <NavLink to="/">
          <img src={news} alt="News Icon" />
          <h1>Yangiliklar</h1>
        </NavLink>
        <NavLink to="/">
          <img src={editorial} alt="Editorial Icon" />
          <h1>Tahririyat</h1>
        </NavLink>
        <NavLink to="/">
          <img src={arxiv} alt="Arxiv Icon" />
          <h1>Arxivlar</h1>
        </NavLink>
        <NavLink to="/">
          <img src={contact} alt="Contact Icon" />
          <h1>Aloqa</h1>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
