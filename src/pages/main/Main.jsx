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
      <Loading isPending={isPending} />
      <Home />
    </main>
  );
}

export default Main;
