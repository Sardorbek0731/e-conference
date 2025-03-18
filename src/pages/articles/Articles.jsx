// CSS
import "./Articles.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Images
import image from "../../assets/logo/logo.png";

// Icons
import download from "../../assets/icons/articles/download.png";

function Articles({ data }) {
  const setData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

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
        {data.map((item, id) => {
          return (
            <NavLink
              className="articleCard"
              to={"/articles/" + item.id}
              key={id}
              onClick={() => {
                setData(item);
              }}
            >
              <div className="articleHeader">
                <img src={image} alt="Article Image" />
                <h1>{item.title}</h1>
              </div>
              <div className="articleBody">
                <h3>
                  <span>Muallif:</span> {item.author}
                </h3>

                <h5>{item.addedTime}</h5>

                <span className="downloadPDF">
                  <img src={download} alt="Download Icon" />
                  PDF
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default Articles;
