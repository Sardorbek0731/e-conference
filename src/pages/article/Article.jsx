// CSS
import "./Article.css";

// Data
import { articles } from "../../data/data";

function Article() {
  const articleID = JSON.parse(localStorage.getItem("articleID"));

  return (
    <section className="article container">
      {articles.map((item, id) => {
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
