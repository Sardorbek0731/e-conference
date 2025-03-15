// CSS
import "./Header.css";

// React Router DOM
import { NavLink, useLocation } from "react-router-dom";

// Images
import logo from "../../assets/logo/logo.png";

// Data
import { header } from "../../data/data";

// React Hooks
import { useEffect, useRef } from "react";

function Header() {
  const location = useLocation();

  const prevPage = useRef(
    JSON.parse(localStorage.getItem("visitedPages"))?.[0] || "/"
  );

  useEffect(() => {
    const visitedPages = [prevPage.current, location.pathname];

    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));

    prevPage.current = location.pathname;
  }, [location.pathname]);

  return (
    <header className={location.pathname.length > 1 ? "otherPage" : ""}>
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo Icon" />
      </NavLink>

      <nav>
        {header.map((item, id) => {
          return location.pathname.length > 1 ? (
            <NavLink to={item.to} key={id}>
              {item.title}
            </NavLink>
          ) : (
            <NavLink to={item.to} key={id}>
              <img src={item.icon} alt="Header Icon" />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
