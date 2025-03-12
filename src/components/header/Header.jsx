// CSS
import "./Header.css";

// React Router DOM
import { NavLink, useLocation } from "react-router-dom";

// Images
import logo from "../../assets/logo/logo.png";

// Icons
import home from "../../assets/icons/home.png";
import info from "../../assets/icons/info.png";
import news from "../../assets/icons/news.png";
import contact from "../../assets/icons/contact.png";
import article from "../../assets/icons/article.png";
import editorial from "../../assets/icons/editorial.png";
import { useEffect } from "react";

function Header() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  console.log(location.pathname.length);

  return (
    <header
      className={
        location.pathname.length > 1 ? "container otherPage" : "container"
      }
    >
      <NavLink to="/" className="logo">
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
        <NavLink to="articles">
          <img src={article} alt="Article Icon" />
          <h1>Maqolalar</h1>
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
          <img src={contact} alt="Contact Icon" />
          <h1>Aloqa</h1>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
