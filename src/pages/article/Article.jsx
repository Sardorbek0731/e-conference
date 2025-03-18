// CSS
import "./Article.css";
import {useEffect} from "react";

// Data

function Article({ data }) {
  const articleID = JSON.parse(localStorage.getItem("articleID"));

    const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data[0].title,
        "author": {
            "@type": "Person",
            "name": data[0].author
        },
        "datePublished": "2025-03-06",
        "dateModified": "2025-03-06",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://online-article.netlify.app/articles/IWZohXfB6DclUZmDQm6J"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sizning sayt nomingiz",
            "logo": {
                "@type": "ImageObject",
                "url": "https://online-article.netlify.app/logo.png"
            }
        }
    };

    useEffect(() => {
        document.title = data[0].title;
        const metaDescription = document.createElement("meta");
        const script = document.createElement("script");
        metaDescription.name = "description";
        metaDescription.content = data[0].title;
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
        <title>{data[0].title}</title>
        <section className="article container">
          {data.map((item, id) => {
            return (
                articleID === item.id && (
                    <div className="articleItem" key={id}>
                      <h1>{item.title}</h1>
                      <p>{item.text}</p>
                    </div>
                )
            );
          })}
        </section>
      </>
  );
}

export default Article;
