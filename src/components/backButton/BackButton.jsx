// CSS
import "./BackButton.css";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Icons
import leftArrow from "../../assets/icons/arrows/left.png";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="backBtn">
      <img src={leftArrow} alt="Left Arrow" />
      Back
    </button>
  );
}

export default BackButton;
