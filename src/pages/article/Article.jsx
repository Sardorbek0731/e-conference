import "./Article.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      document.head.appendChild(metaDescription);
      document.head.appendChild(script);
    });

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(script);
    };
  }, [articleId]);

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      {!isPending && <title>{article.title}</title>}
      <section className="article container">
        <div className="articleButtons">
          <BackButton to="/articles" />

          {!isPending && (
            <span className="articlePDF">
              <span className="downloadArticleIcon">
                <img src={download} alt="Download Icon" />
              </span>
              Download (PDF)
            </span>
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
