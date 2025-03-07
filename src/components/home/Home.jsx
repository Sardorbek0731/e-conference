// CSS
import "./Home.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Icons
import telegram from "../../assets/icons/telegram.png";
import twitter from "../../assets/icons/twitter.png";
import instagram from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";

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

      <div className="socialNetworks">
        <NavLink to="#">
          <img src={telegram} alt="Telegram Icon" />
        </NavLink>
        <NavLink to="#">
          <img src={twitter} alt="Twitter Icon" />
        </NavLink>
        <NavLink to="#">
          <img src={instagram} alt="Instagram Icon" />
        </NavLink>
        <NavLink to="#">
          <img src={facebook} alt="Facebook Icon" />
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
