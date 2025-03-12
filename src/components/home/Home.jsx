// CSS
import "./Home.css";

// React Router DOM
import { NavLink } from "react-router-dom";

// Icons
import telegram from "../../assets/icons/social-network/telegram.png";
import twitter from "../../assets/icons/social-network/twitter.png";
import instagram from "../../assets/icons/social-network/instagram.png";
import facebook from "../../assets/icons/social-network/facebook.png";

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
        <a href="#">
          <img src={telegram} alt="Telegram Icon" />
        </a>
        <a href="#">
          <img src={twitter} alt="Twitter Icon" />
        </a>
        <a href="#">
          <img src={instagram} alt="Instagram Icon" />
        </a>
        <a href="#">
          <img src={facebook} alt="Facebook Icon" />
        </a>
      </div>
    </section>
  );
}

export default Home;
