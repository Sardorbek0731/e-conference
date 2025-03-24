import "./Article.css";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getArticleById } from "../../services/articleService.js";
import BackButton from "../../components/backButton/BackButton.jsx";
import download from "../../assets/icons/arrows/down.png";
import Loading from "../../components/loading/Loading.jsx";

function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const metaDescription = document.createElement("meta");
    const script = document.createElement("script");

    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
        return data;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchArticle().then((article) => {
      const metaGS = `
      <meta name="citation_title" content="${article.title}">
      <meta name="citation_author" content="${article.author}">
      <meta name="citation_publication_date" content="${article.createdAt}">
      <meta name="citation_journal_title" content="E-Conference-Online">
      <meta name="citation_pdf_url" content="https://e-conference-online.com/">
    `
      const parser = new DOMParser();
      const metaGSDOM = parser.parseFromString(metaGS, "text/html");
      const publishedDate = new Date(
        article.createdAt.seconds * 1000 + article.createdAt.nanoseconds / 1e6
      ).toISOString();
      metaDescription.name = "description";
      metaDescription.content = article.title;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        author: {
          "@type": "Person",
          name: article.author,
        },
        datePublished: publishedDate,
        dateModified: publishedDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `http://e-conference-online.com/articles/${article.id}`,
        },
        publisher: {
          "@type": "Organization",
          name: "E-Conference Online",
          logo: {
            "@type": "ImageObject",
            url: "https://e-conference-online.com/assets/logo-Dzx-hfE_.png",
          },
        },
      });
      document.head.appendChild(metaGSDOM)
      document.head.appendChild(metaDescription);
      document.head.appendChild(script);
    });
  }, [articleId]);

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      {!isPending && <title>{article.title}</title>}
      <section className="article container">
        <div className="articleButtons">
          <BackButton to="/articles" />

          {!isPending && (
            <div className="articePageDownload-buttons">
              <span className="articlePDF">
                <span className="downloadArticleIcon">
                  <img src={download} alt="Download Icon" />
                </span>
                Download (PDF)
              </span>

              <NavLink to="/" className="articlePage-zenodo">
                ZENODO
              </NavLink>
            </div>
          )}
        </div>
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <>
            <h1>{article.title}</h1>
            <h1>{article.author}</h1>
            <div
              className="articleItem"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </>
        )}
      </section>
    </>
  );
}

export default Article;
