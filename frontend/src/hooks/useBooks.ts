import { useEffect, useState } from "react";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request } = bookService.getAll<Book>();

    request.then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return { books, error, loading, setBooks, setError };
};

export default useBooks;
