import "./Conference.css";
import { useParams, useNavigate } from "react-router-dom";
import { getConferenceById } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

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

  return isPending ? (
    <Loading isPending={isPending} />
  ) : (
    <>
      {console.log(conference)}

      <section className="conference container">
        <h1>Conference</h1>
      </section>
    </>
  );
}

export default Conference;
