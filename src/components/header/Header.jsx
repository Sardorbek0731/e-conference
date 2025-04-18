import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { images } from "../../data/data";
import { header } from "../../data/data";

function Header() {
  const location = useLocation();
  const pageNotFound =
    location.pathname !== "/error" && location.pathname !== "/login";

  return (
    pageNotFound && (
      <header className={location.pathname.length > 1 ? "otherPage" : ""}>
        <NavLink to="/" className="logo">
          <img src={images.logo} alt="Logo Icon" />
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
