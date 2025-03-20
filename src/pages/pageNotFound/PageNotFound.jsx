import "./PageNotFound.css";
import pageNotFoundImg from "../../assets/images/pageNotFound.png";
import BackButton from "../../components/backButton/BackButton";

function PageNotFound() {
  return (
    <section className="pageNotFound container">
      <BackButton to="/" />
      <div className="pageNotFound-img">
        <img src={pageNotFoundImg} alt="Page Not Found Image" />
      </div>
    </section>
  );
}

export default PageNotFound;
