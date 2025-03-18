// CSS
import "./Article.css";
import { useEffect } from "react";

// Data

function Article({ data }) {
  const getData = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : data;

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: getData.title,
    author: {
      "@type": "Person",
      name: getData.author,
    },
    datePublished: getData.createdAt,
    dateModified: "2025-03-06",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://online-article.netlify.app/articles/IWZohXfB6DclUZmDQm6J",
    },
    publisher: {
      "@type": "Organization",
      name: "E-Conference Online",
      logo: {
        "@type": "ImageObject",
        url: "https://online-article.netlify.app/logo.png",
      },
    },
  };

  useEffect(() => {
    const metaDescription = document.createElement("meta");
    const script = document.createElement("script");
    metaDescription.name = "description";
    metaDescription.content = getData.title;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(articleData);
    document.head.appendChild(metaDescription);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <title>{getData.title}</title>
      <section className="article container">
        <div className="articleItem">
          <h1>{getData.title}</h1>
          <p>{getData.text}</p>
        </div>
      </section>
    </>
  );
}

export default Article;
