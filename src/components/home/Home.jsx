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
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
