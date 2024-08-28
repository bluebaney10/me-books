import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";

const CreateBook = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value } as Pick<Book, keyof Book>);
  };

  const handleCreateBook = () => {
    setLoading(true);
    bookService
      .createBook(book)
      .then(() => {
        setLoading(false);
        navigate("/");
        console.log("success");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log("error");
      });
  };

  return (
    <>
      <BackButton />
      <h2>Create Book</h2>
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
      <button className="" onClick={handleCreateBook}>
        Create
      </button>
    </>
  );
};

export default CreateBook;
