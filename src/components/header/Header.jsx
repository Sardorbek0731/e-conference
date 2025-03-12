// CSS
import "./Header.css";

// React Router DOM
import { NavLink, useLocation } from "react-router-dom";

// Images
import logo from "../../assets/logo/logo.png";

// Data
import { header } from "../../data/data";

// React Hooks
import { useEffect } from "react";

function Header() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  return location.pathname.length > 1 ? (
    <header className="container otherPage">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo Icon" />
      </NavLink>

      <nav>
        {header.text.map((item, id) => {
          return (
            <NavLink to={item.to} key={id}>
              <img src={header.darkIcon[id]} alt="Header Icon" />
              <h1>{item.title}</h1>
            </NavLink>
          );
        })}
      </nav>
    </header>
  ) : (
    <header className="container">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo Icon" />
      </NavLink>

      <nav>
        {header.text.map((item, id) => {
          return (
            <NavLink to={item.to} key={id}>
              <img src={header.lightIcon[id]} alt="Header Icon" />
              <h1>{item.title}</h1>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
