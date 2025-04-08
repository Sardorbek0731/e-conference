import "./Conferences.css";
import { images } from "../../data/data";
import { getConferences } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../loading/Loading";

function Conferences() {
  const [conferences, setConferences] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const fetchConferences = async () => {
    try {
      const data = await getConferences();
      setConferences(data);
    } catch (error) {
      console.error("Konferensiyalarni olishda xatolik:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  return (
    <section className="conferences container" id="conferences">
      <div className="sectionTitle">
        <h1>Conferences</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          molestias nulla odit esse.
        </p>
      </div>
      <div className="conferencesList">
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          conferences.map((conference) => (
            <div key={conference.id} className="conferencesItem">
              <NavLink to={"/" + conference.id}>
                <img src={images.logo} alt="Conference Image" />
              </NavLink>
              <div className="conferencesColumn">
                <NavLink to={"/" + conference.id}>
                  <h1>{conference.title}</h1>
                </NavLink>
                <p>{conference.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Conferences;
