import { useEffect, useState } from "react";
import { getArticles } from "../services/articleService";

export function useFetch() {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();

      data.map((item) => {
        const date = new Date(item.createdAt.seconds * 1000);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}, ${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}`;

        return (item.addedTime = formattedDate);
      });

      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { data, isPending, error, fetchArticles };
}
