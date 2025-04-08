import "./PageNotFound.css";
import BackButton from "../../components/backButton/BackButton";
import { images } from "../../data/data";

function PageNotFound() {
  return (
    <section className="pageNotFound container">
      <BackButton />
      <div className="pageNotFound-img">
        <img src={images.pageNotFound} alt="Page Not Found Image" />
      </div>
    </section>
  );
}

export default PageNotFound;
