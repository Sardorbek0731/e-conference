import "./Articles.css";
import image from "../../assets/logo/logo.png";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading.jsx";
import { NavLink } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.jsx";
import { downloadPDF } from "../../services/articleService.js";
import { useRef } from "react";

function Articles() {
  const articleRef = useRef();
  const { data, isPending, error } = useFetch();

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="articles">
      <div className="sectionTitle">
        <BackButton to="/" />
        <h1>Articles</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      {isPending ? (
        <Loading isPending={isPending} />
      ) : (
        <div className="articleCards">
          {data.map((article) => {
            return (
              <div className="articleCard" key={article.id}>
                <NavLink to={`/articles/${article.id}`}>
                  <div className="articleHeader">
                    <img src={image} alt="Article Image" />
                    <h3>{article.title}</h3>
                  </div>
                  <div className="articleBody">
                    <h4>
                      <span>Muallif:</span> {article.author}
                    </h4>
                  </div>
                </NavLink>

                <div className="articleFooter">
                  <div className="articleDownload-buttons">
                    <span
                      className="downloadPDF"
                      onClick={() => {
                        downloadPDF(article, articleRef);
                      }}
                    >
                      Download (PDF)
                    </span>
                    <NavLink to="/" className="zenodo">
                      ZENODO
                    </NavLink>
                  </div>

                  <h5>{article.addedTime}</h5>
                </div>

                <div className="articlePDF-UI" ref={articleRef}>
                  <h1 className="articlePDF-UITitle">{article.title}</h1>
                  <h3 className="articlePDF-UIAuther">{article.author}</h3>
                  <div
                    className="articlePDF-UIContent"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Articles;
