import "./Conference.css";
import { useParams, useNavigate } from "react-router-dom";
import { getConferenceById } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/backButton/BackButton";

function Conference() {
  const [conference, setConference] = useState(null);
  const { conferenceId } = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);

  const fetchConference = async () => {
    try {
      const data = await getConferenceById(conferenceId);
      if (!data) {
        navigate("/error", { replace: true });
        return;
      }
      setConference(data);
      return data;
    } catch (err) {
      console.log("Error:" + err);
      navigate("/error", { replace: true });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchConference();
  }, []);

  return (
    <>
      {!isPending && <title>{conference.title}</title>}
      <section className="conference container">
        <BackButton to="/" />

        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="conferenceItem" key={conference.id}>
            <h1>{conference.title}</h1>
            <p>{conference.description}</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Conference;
