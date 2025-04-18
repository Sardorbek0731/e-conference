import "./Article.css";
import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { getArticleById } from "../../services/articleService.js";
import { icons } from "../../data/data.js";
import BackButton from "../../components/backButton/BackButton.jsx";
import Loading from "../../components/loading/Loading.jsx";

function Article() {
  const [article, setArticle] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { articleId } = useParams();
  const navigate = useNavigate();

  const createMetaTag = (name, content) => {
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content || " ";
    return meta;
  };

  useEffect(() => {
    const addedElements = [];
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        if (!data) {
          navigate("/error", { replace: true });
          return;
        }
        setArticle(data);
        return data;
      } catch (err) {
        setError(err.message);
        navigate("/error", { replace: true });
      } finally {
        setIsPending(false);
      }
    };

    fetchArticle().then((article) => {
      const publishedDate = article.createdAt
        ? new Date(
            article.createdAt.seconds * 1000 +
              article.createdAt.nanoseconds / 1e6
          ).toISOString()
        : new Date().toISOString();

      const metaDescription = createMetaTag("description", article.title);
      const metaTitle = createMetaTag("citation_title", article.title);
      const metaDate = createMetaTag(
        "citation_publication_date",
        publishedDate.slice(0, 10)
      );
      const metaJournal = createMetaTag(
        "citation_journal_title",
        "E-Conference-Online"
      );
      const metaPdfUrl = createMetaTag("citation_pdf_url", article.pdfURL);

      article && article.authors.length && article.authors.forEach(author => {
        const metaAuthor = createMetaTag("citation_author", author);
        document.head.appendChild(metaAuthor);
        addedElements.push(metaAuthor);
      })

      document.head.appendChild(metaDescription);
      document.head.appendChild(metaTitle);
      document.head.appendChild(metaDate);
      document.head.appendChild(metaJournal);
      document.head.appendChild(metaPdfUrl);
      addedElements.push(
        metaDescription,
        metaTitle,
        metaDate,
        metaJournal,
        metaPdfUrl
      );

      const script = document.createElement("script");
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

      document.head.appendChild(script);
      addedElements.push(script);
    });

    return () => {
      addedElements.forEach((el) => {
        if (document.head.contains(el)) {
          document.head.removeChild(el);
        }
      });
    };
  }, [articleId, navigate]);

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      {!isPending && <title>{article.title}</title>}
      <section className="article container">
        <div className="articleButtons">
          <BackButton />

          {!isPending && (
            <div className="articePageDownload-buttons">
              <a
                href={article.pdfURL}
                download
                target="_blank"
                className="articlePDF"
              >
                <span className="downloadArticleIcon">
                  <img src={icons.downArrow} alt="Download PDF" />
                </span>
                Download (PDF)
              </a>

              <NavLink to="/" className="articlePage-zenodo">
                ZENODO
              </NavLink>
            </div>
          )}
        </div>
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="articleItem">
            <h1 className="articleTitle">{article.title}</h1>
            <h3 className="articleAuther">{article.authors.join(", ")}</h3>
            <div
              className="articleContent"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </div>
        )}
      </section>
    </>
  );
}

export default Article;
