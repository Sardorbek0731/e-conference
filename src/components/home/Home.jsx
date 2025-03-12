// CSS
import "./Home.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Icons
import telegram from "../../assets/icons/telegram.png";
import twitter from "../../assets/icons/twitter.png";
import instagram from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";

// Images
import paperPen from "../../assets/images/paper-pen.png";

function Home() {
  return (
    <section className="home container">
      <div className="homeTitle">
        <h1>E-Conference</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          cum similique perspiciatis eum architecto corrupti eius quas molestias
          perferendis? Enim repudiandae saepe maxime, iste sunt quidem
          laudantium dolore recusandae beatae.
        </p>
        <NavLink to="#" className="detailBtn">
          Batafsil
        </NavLink>
      </div>

      <img className="penAndPaper" src={paperPen} alt="Paper And Pen Image" />

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
