import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { header } from "../../data/data";

function Header() {
  const location = useLocation();

  return (
    location.pathname !== "/login" && (
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
