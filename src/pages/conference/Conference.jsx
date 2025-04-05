import "./Conference.css";
import { useParams, useNavigate } from "react-router-dom";
import { getConferenceById } from "../../services/conferenceService";
import { getArticleById } from "../../services/articleService";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/backButton/BackButton";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo/logo.png";

function Conference() {
  const [conference, setConference] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  const fetchConference = async () => {
    try {
      const data = await getConferenceById(conferenceId);
      if (!data) {
        navigate("/error", { replace: true });
        return;
      }
      setConference(data);

      const articlePromises = data.article_ids.map(async (id) => {
        try {
          const article = await getArticleById(id);

          const date = new Date(article.createdAt.seconds * 1000);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}, ${String(date.getHours()).padStart(
            2,
            "0"
          )}:${String(date.getMinutes()).padStart(2, "0")}`;

          article.addedTime = formattedDate;

          return article;
        } catch (err) {
          console.log("Article Error: " + err);
          return null;
        }
      });

      const fetchedArticles = await Promise.all(articlePromises);
      setArticles(fetchedArticles.filter((article) => article !== null));
    } catch (err) {
      console.log("Conference Error: " + err);
      navigate("/error", { replace: true });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchConference();
  }, []);

  return (
    <>
      {!isPending && <title>{conference.title}</title>}
      <section className="conference container">
        <BackButton />

        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="conferenceItem" key={conference.id}>
            <h1>{conference.title}</h1>
            <p>{conference.description}</p>
            <div className="articleCards">
              {isPending ? (
                <Loading isPending={isPending} />
              ) : articles.length > 0 ? (
                articles.map(({ title, author, pdfURL, addedTime, id }) => (
                  <div className="articleCard" key={id}>
                    <NavLink to={`/articles/${id}`}>
                      <div className="articleHeader">
                        <img src={image} alt="Article Image" />
                        <h3>{title}</h3>
                      </div>
                      <div className="articleBody">
                        <h4>
                          <span>Author:</span> {author}
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
                ))
              ) : (
                <p>No articles found.</p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Conference;
