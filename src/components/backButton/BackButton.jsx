import "./BackButton.css";
import { icons } from "../../data/data";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const backPage = () => {
    navigate(-1);
  };

  return (
    <button onClick={backPage} className="backBtn">
      <img src={icons.leftArrow} alt="Left Arrow" />
      Back
    </button>
  );
}

export default BackButton;
