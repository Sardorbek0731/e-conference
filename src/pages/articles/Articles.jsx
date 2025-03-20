import "./Articles.css";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo/logo.png";
import download from "../../assets/icons/articles/download.png";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading.jsx";
import { useEffect, useState } from "react";
import { getArticles } from "../../services/articleService";

function Articles() {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setData(data);
      setIsPending(false);
    };

    fetchArticles();
  }, []);

  const setStoreData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  if (isPending) return <Loading isPending={isPending} />;

  return (
    <section className="articles">
      <div className="sectionTitle">
        <div className="sectionTitle_row">
          <BackButton to="/" />
          <span>Articles - Статьи</span>
        </div>
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
                setStoreData(item);
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
