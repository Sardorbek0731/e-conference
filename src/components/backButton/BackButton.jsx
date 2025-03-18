// CSS
import "./BackButton.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Icons
import leftArrow from "../../assets/icons/arrows/left.png";

function BackButton({ to }) {
  return (
    <NavLink to={to} className="backBtn">
      <img src={leftArrow} alt="Left Arrow" />
      Back
    </NavLink>
  );
}

export default BackButton;
