import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const { request } = bookService.getAll<Book>();

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
      <h2>Books List</h2>
      <Link to="/books/create">Create new book</Link>
      {error && <p className="text-danger">{error}</p>}
      {loading && <div className="spinner-border">Loadding...</div>}
      <div className="items">
        {books?.map((book) => (
          <div className="item" key={book._id}>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <h4>{book.publishYear}</h4>
            <div className="action">
              <Link to={`/books/show/${book._id}`}>
                <span className="view">view</span>
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <span className="view">Edit</span>
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <span className="view">Delete</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
