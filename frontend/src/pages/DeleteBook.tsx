import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Spinner from "../components/Spinner";
import bookService from "../services/book-service";
import { CanceledError } from "../services/api-client";
import { Hilight } from "../components/Hilight";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    bookService
      .delete(String(id))
      .then(() => {
        setLoading(false);
        navigate("/books/mebook");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <>
      <Hilight title="Delete Your Book" />
      <section className="page delete-book">
        <div className="container">
          <ButtonBack />
          {error && <p className="text-danger">{error}</p>}
          {loading ? <Spinner /> : ""}
          <div className="content">
            <h3 className="head">Are you sure you want to delete this book</h3>
            <button className="bt-danger" onClick={handleDeleteBook}>
              <span className="txt">Yes, Delete it</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteBook;
