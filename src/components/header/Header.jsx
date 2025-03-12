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
        {header.map((item, id) => {
          return (
            <NavLink to={item.to} key={id}>
              <img src={item.icon} alt="Header Icon" />
              <h1>{item.title}</h1>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
