// CSS
import "./Articles.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Images
import image from "../../assets/logo/logo.png";

// Icons
import download from "../../assets/icons/articles/download.png";

function Articles() {
  return (
    <section className="articles">
      <div className="sectionTitle">
        <span>Articles - Статьи</span>
        <h1>Maqolalar</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <div className="articleCards">
        <NavLink className="articleCard" to="/articles/1">
          <div className="articleHeader">
            <img src={image} alt="Article Image" />
            <h1>
              Ftiziatriya fanini o‘qitishda tibbiyot talabalari klinik
              fikrlashini oshirishda FILA jadvalining ahamiyati
            </h1>
          </div>
          <div className="articleBody">
            <h3>
              <span>Muallif:</span> Matkurbonov Khamdambek Ilxambekovich
            </h3>

            <h5>01.01.2025, 00:00</h5>

            <span className="downloadPDF">
              <img src={download} alt="Download Icon" />
              PDF
            </span>
          </div>
        </NavLink>
        <NavLink className="articleCard" to="/articles/2">
          <div className="articleHeader">
            <img src={image} alt="Article Image" />
            <h1>THE RELEVANCE OF MEASLES TODAY</h1>
          </div>
          <div className="articleBody">
            <h3>
              <span>Muallif:</span> Sadullaev Siroj Ernazarovich
            </h3>

            <h5>15.03.2025, 12:05</h5>

            <span className="downloadPDF">
              <img src={download} alt="Download Icon" />
              PDF
            </span>
          </div>
        </NavLink>
      </div>
    </section>
  );
}

export default Articles;
