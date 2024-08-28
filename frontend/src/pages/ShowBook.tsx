import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";

const ShowBook = () => {
  const [books, setBooks] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const { request } = bookService.getItem<Book>(String(id));
    setLoading(true);

    request
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
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
