import "./PageNotFound.css";
import pageNotFoundImg from "../../assets/images/pageNotFound.png";
import BackButton from "../../components/backButton/BackButton";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className="pageNotFound container">
      <BackButton to={navigate(-1)} />
      <div className="pageNotFound-img">
        <img src={pageNotFoundImg} alt="Page Not Found Image" />
      </div>
    </section>
  );
}

export default PageNotFound;
