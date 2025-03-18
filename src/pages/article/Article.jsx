import "./Article.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../services/articleService.js";
import BackButton from "../../components/backButton/BackButton.jsx";

function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const metaDescription = document.createElement("meta");
    const script = document.createElement("script");

    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle().then((article) => {
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
        datePublished: article.createdAt,
        dateModified: "2025-03-06",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://online-article.netlify.app/articles/IWZohXfB6DclUZmDQm6J",
        },
        publisher: {
          "@type": "Organization",
          name: "E-Conference Online",
          logo: {
            "@type": "ImageObject",
            url: "https://online-article.netlify.app/logo.png",
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

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      <title>{article.title}</title>
      <section className="article container">
        <BackButton to="/articles" />
        <div className="articleItem">
          <h1>{article.title}</h1>
          <p>{article.text}</p>
        </div>
      </section>
    </>
  );
}

export default Article;
