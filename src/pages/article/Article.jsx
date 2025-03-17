// CSS
import "./Article.css";

// Data

function Article({ data }) {
  const articleID = JSON.parse(localStorage.getItem("articleID"));

  return (
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
  );
}

export default Article;
