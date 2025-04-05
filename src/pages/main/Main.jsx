import Home from "../../components/home/Home";
import Conference from "../../components/conference/Conference.jsx";
import { useState, useEffect } from "react";

function Main() {
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(false);
  }, []);

  return (
    <main>
      <div className={isPending ? "main-loader" : "hidden"}>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Home />
      <Conference />
    </main>
  );
}

export default Main;
