// CSS
import "./Home.css";

// React Router DOM
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <section className="home container">
      <div className="homeTitle">
        <h1>E-Conference</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
          cupiditate qui recusandae. Illo placeat minus ut modi omnis
          reiciendis, officia atque illum, ipsum velit sequi odit distinctio
          nemo.
        </p>
        <NavLink to="#" className="detailBtn">
          Batafsil
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
