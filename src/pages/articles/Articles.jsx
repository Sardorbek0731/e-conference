import "./Articles.css";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo/logo.png";
import download from "../../assets/icons/arrows/down-mainColor.png";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";

function Articles() {
  const { data, isPending, error } = useFetch();

  const setStoreData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

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
          {data.map((item, id) => {
            return (
              <div className="articleCard" key={id}>
                <NavLink
                  to={"/articles/" + item.id}
                  onClick={() => {
                    setStoreData(item);
                  }}
                >
                  <div className="articleHeader">
                    <img src={image} alt="Article Image" />
                    <h3>{item.title}</h3>
                  </div>
                  <div className="articleBody">
                    <h4>
                      <span>Muallif:</span> {item.author}
                    </h4>

                    <h5>{item.addedTime}</h5>
                  </div>
                </NavLink>

                <span className="downloadPDF">
                  <img src={download} alt="Download Icon" />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Articles;
