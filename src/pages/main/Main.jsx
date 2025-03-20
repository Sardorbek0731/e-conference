import Home from "../../components/home/Home";
import Loading from "../../components/loading/Loading.jsx";
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
    </main>
  );
}

export default Main;
