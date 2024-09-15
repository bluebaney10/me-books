import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";
import { Hilight } from "../components/Hilight";
import coverBg from "../assets/cover-bg.jpg";
import { useAuth0 } from "@auth0/auth0-react";

const CreateBook = () => {
  const [book, setBook] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    publishYear: 0,
    imageUrl: "",
    videoUrl: "",
    summary: "",
    detail: "",
    themeColor: "",
    userCreated: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [invalid, setInvalid] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value } as Pick<Book, keyof Book>);
  };

  const handleCreateBook = () => {
    const validationErrors = { title: "", author: "", publishYear: "" };
    let numOfError = 0;

    if (!book.title.trim()) {
      validationErrors.title = "title is required";
      numOfError += 1;
    }

    if (!book.author.trim()) {
      validationErrors.author = "author is required";
      numOfError += 1;
    }

    if (Number(book?.publishYear) <= 0) {
      validationErrors.publishYear =
        "publishYear is not zoro or negative number";
      numOfError += 1;
    }

    setInvalid(validationErrors);
    if (numOfError != 0) {
      return;
    }

    if (isAuthenticated && user) {
      setBook({ ...book, userCreated: user.sub } as Pick<Book, keyof Book>);
    } else {
      return;
    }

    setLoading(true);
    bookService
      .create(book)
      .then(() => {
        setLoading(false);
        setIsSuccess(true);
        navigate("/books/mebook");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Hilight title="Create Your Book" />
      <section className="page">
        <div className="container">
          <ButtonBack />
          {error && <p className="text-danger">{error}</p>}
          {loading ? <Spinner /> : ""}

          <div className="items">
            <div className="item">
              <div className="image">
                <img src={coverBg} alt="" />
              </div>
              <div className="texts">
                <div className="block title">
                  <label>Title: </label>
                  <input
                    type="text"
                    name="title"
                    value={book?.title}
                    onChange={handleInputChange}
                    className=""
                  />

                  <span
                    className={
                      invalid.title ? "text-danger active" : "text-danger"
                    }
                  >
                    {invalid.title}
                  </span>
                </div>
                <div className="block author">
                  <label>Author: </label>
                  <input
                    type="text"
                    name="author"
                    value={book?.author}
                    onChange={handleInputChange}
                    className=""
                  />
                  <span
                    className={
                      invalid.author ? "text-danger active" : "text-danger"
                    }
                  >
                    {invalid.author}
                  </span>
                </div>

                <div className="block year">
                  <label>Publish Year: </label>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    name="publishYear"
                    value={book?.publishYear}
                    onChange={handleInputChange}
                  />
                  <span
                    className={
                      invalid.publishYear ? "text-danger active" : "text-danger"
                    }
                  >
                    {invalid.publishYear}
                  </span>
                </div>
                <div className="block details">
                  <label>Summary: </label>
                  <textarea
                    name="summary"
                    value={book?.summary}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div className="block details">
                  <label>Details: </label>
                  <textarea
                    name="detail"
                    value={book?.detail}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>

                <div className="block details">
                  <label>imageUrl: </label>
                  <input
                    name="imageUrl"
                    value={book?.imageUrl}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>

                <div className="block details">
                  <label>videoUrl: </label>
                  <input
                    name="videoUrl"
                    value={book?.videoUrl}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>

                <div className="block details">
                  <label>themeColor: </label>
                  <input
                    name="themeColor"
                    value={book?.themeColor}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>

                {isSuccess && (
                  <span className="text-success">Create book Success</span>
                )}
              </div>
            </div>
          </div>
          <div className="bts">
            <button className="bt-primary" onClick={handleCreateBook}>
              <span className="txt">Create</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateBook;
