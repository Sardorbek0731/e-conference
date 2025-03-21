import "./Articles.css";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo/logo.png";
import download from "../../assets/icons/arrows/down-mainColor.png";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";

function Articles() {
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
          {data.map(({ id, title, author, addedTime }) => (
            <div className="articleCard" key={id}>
              <NavLink
                to={`/articles/${id}`}
                onClick={() =>
                  localStorage.setItem(
                    "data",
                    JSON.stringify({ id, title, author, addedTime })
                  )
                }
              >
                <div className="articleHeader">
                  <img src={image} alt="Article Image" />
                  <h3>{title}</h3>
                </div>
                <div className="articleBody">
                  <h4>
                    <span>Muallif:</span> {author}
                  </h4>
                  <h5>{addedTime}</h5>
                </div>
              </NavLink>
              <span className="downloadPDF">
                <img src={download} alt="Download Icon" />
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Articles;
