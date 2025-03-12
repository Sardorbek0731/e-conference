// CSS
import "./Articles.css";

// React Router DOM
import { NavLink } from "react-router-dom";

function Articles() {
  return (
    <section className="articles container">
      <NavLink to="/articles/1">Articles</NavLink>
    </section>
  );
}

export default Articles;
