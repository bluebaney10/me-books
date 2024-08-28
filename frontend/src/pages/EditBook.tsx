import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";

const EditBook = () => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { request } = bookService.getItem<Book>(String(id));

    setLoading(true);
    request
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value } as Pick<Book, keyof Book>);
  };

  const handleUpdateBook = () => {
    if (!book) return;

    setLoading(true);
    bookService
      .update(book)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <BackButton />
      <h2>Edit Book</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? <Spinner /> : ""}

      <div className="items">
        <div className="item">
          <span className="">Title</span>
          <input
            type="text"
            name="title"
            value={book?.title}
            onChange={handleInputChange}
            className=""
          />
        </div>
        <div className="item">
          <span className="">Author</span>
          <input
            type="text"
            name="author"
            value={book?.author}
            onChange={handleInputChange}
            className=""
          />
        </div>
        <div className="item">
          <span className="">PublishYear</span>
          <input
            type="text"
            name="publishYear"
            value={book?.publishYear}
            onChange={handleInputChange}
            className=""
          />
        </div>
      </div>
      <button className="" onClick={handleUpdateBook}>
        Update
      </button>
    </>
  );
};

export default EditBook;
