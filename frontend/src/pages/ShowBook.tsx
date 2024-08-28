import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

interface Book {
  _id: number;
  title: string;
  author: string;
  publishYear: number;
}

const ShowBook = () => {
  const [books, setBooks] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get<Book>(`http://localhost:3333/books/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <BackButton />
      <h2>Book Detail</h2>
      {error && <p className="">{error}</p>}
      {loading ? <Spinner /> : ""}
      <div className="item">
        <h2>{books?.title}</h2>
        <h3>{books?.author}</h3>
        <h4>{books?.publishYear}</h4>
      </div>
    </>
  );
};

export default ShowBook;
