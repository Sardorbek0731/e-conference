// CSS
import "./Articles.css";

// React Router DOM
import { NavLink } from "react-router-dom";

function Articles() {
  return (
    <section className="articles container">
      <div className="sectionTitle">
        <span>Articles - Статьи</span>
        <h1>Maqolalar</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <NavLink to="/articles/1">Articles</NavLink>
    </section>
  );
}

export default Articles;
