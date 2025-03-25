import "./BackButton.css";
import leftArrow from "../../assets/icons/arrows/left.png";
import { NavLink } from "react-router-dom";

function BackButton({ to }) {
  return (
    <NavLink to={to} className="backBtn">
      <img src={leftArrow} alt="Left Arrow" />
      Back
    </NavLink>
  );
}

export default BackButton;
