import "./Conferences.css";
import logo from "../../assets/logo/logo.png";
import { getConferences } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Conferences() {
  const [conferences, setConferences] = useState(null);

  const fetchConferences = async () => {
    try {
      const data = await getConferences();
      setConferences(data);
    } catch (error) {
      console.error("Konferensiyalarni olishda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  return (
    <section className="conference container">
      <div className="sectionTitle">
        <h1>Conferences</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <div className="conferenceList">
        {conferences &&
          conferences.map((conference) => (
            <div key={conference.id} className="conferenceItem">
              <NavLink to={"/" + conference.id}>
                <img src={logo} alt="Conference Image" />
              </NavLink>
              <div className="conferenceColumn">
                <NavLink to={"/" + conference.id}>
                  <h1>{conference.title}</h1>
                </NavLink>
                <p>{conference.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Conferences;
