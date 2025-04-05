import "./BackButton.css";
import leftArrow from "../../assets/icons/arrows/left.png";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const backPage = () => {
    navigate(-1);
  };

  return (
    <button onClick={backPage} className="backBtn">
      <img src={leftArrow} alt="Left Arrow" />
      Back
    </button>
  );
}

export default BackButton;
