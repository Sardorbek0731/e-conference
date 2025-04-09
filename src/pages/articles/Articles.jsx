import "./Articles.css";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading";
import { NavLink } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { images } from "../../data/data.js";
import { getArticles } from "../../services/articleService.js";

function Articles() {
  const { data, isPending, error } = useFetch(getArticles);

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="articles">
      <div className="sectionTitle">
        <BackButton />
        <h1>Articles</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <div className="articleCards">
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          data.map(({ title, authors, pdfURL, addedTime, id }) => {
            return (
              <div className="articleCard" key={id}>
                <NavLink to={`/articles/${id}`}>
                  <div className="articleHeader">
                    <img src={images.logo} alt="Article Image" />
                    <h3>{title}</h3>
                  </div>
                  <div className="articleBody">
                    <h4>
                      <span>Author: </span>
                      {authors.join(", ")}
                    </h4>
                  </div>
                </NavLink>

                <div className="articleFooter">
                  <div className="articleDownload-buttons">
                    <a
                      href={pdfURL}
                      download
                      target="_blank"
                      className="downloadPDF"
                    >
                      Download (PDF)
                    </a>
                    <NavLink to="/" className="zenodo">
                      ZENODO
                    </NavLink>
                  </div>

                  <h5>{addedTime}</h5>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Articles;
