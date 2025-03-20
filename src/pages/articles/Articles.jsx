import "./Articles.css";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo/logo.png";
import download from "../../assets/icons/download.png";
import BackButton from "../../components/backButton/BackButton";
import Loading from "../../components/loading/Loading.jsx";
import { useEffect, useState } from "react";
import { getArticles } from "../../services/articleService";

function Articles() {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();

        data.map((item) => {
          const date = new Date(
            item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1e6
          ).toLocaleString();

          return (item.addedTime = date);
        });
        setData(data);

        return data;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchArticles();
  }, []);

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
