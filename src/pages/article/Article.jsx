// CSS
import "./Article.css";

// Data

function Article({ data }) {
  const articleID = JSON.parse(localStorage.getItem("articleID"));

  return (
      <>
        <div>
            <title>{data[0].title}</title>
            <meta name="description" content={data[0].title} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "http://schema.org",
                "@type": "ScholarlyArticle",
                "name": data[0].title,
                "author": {
                  "@type": "Person",
                  "name": data[0].author
                },
                "datePublished": data[0].createdAt,
                "publisher": {
                  "@type": "Organization",
                  "name": "Sizning Vebsaytingiz"
                },
                "url": window.location.href
              })}
            </script>
        </div>
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
