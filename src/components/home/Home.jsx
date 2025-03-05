// CSS
import "./Home.css";

// Image
import homeBg from "../../assets/images/home-bg.webp";

function Home() {
  return (
    <section>
      <div className="homeBg">
        <img src={homeBg} alt="Home Background Image" />
      </div>
    </section>
  );
}

export default Home;
