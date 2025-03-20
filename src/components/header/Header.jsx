// CSS
import "./Header.css";

// React Router DOM
import { NavLink, useLocation } from "react-router-dom";

// Images
import logo from "../../assets/logo/logo.png";

// Data
import { header } from "../../data/data";

function Header() {
  const location = useLocation();

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/articles" &&
    !location.pathname.startsWith("/articles/") &&
    location.pathname !== "/login" &&
    location.pathname !== "/manage-articles";

  return (
    !isNotFoundPage && (
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
    )
  );
}

export default Header;
