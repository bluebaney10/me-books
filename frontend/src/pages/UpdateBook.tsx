import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";
import { Hilight } from "../components/Hilight";

const UpdateBook = () => {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        navigate("/books/mebook");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Hilight title="Update Book" />
      <section className="page update-book">
        <div className="container">
          <ButtonBack />
          {error && <p className="text-danger">{error}</p>}
          {loading ? <Spinner /> : ""}

          <div className="items">
            <div className="item">
              <div className="media">
                {book?.videoUrl?.trim() ? (
                  <div className="video">
                    <iframe
                      src={`https://www.youtube.com/embed/${book?.videoUrl}`}
                    ></iframe>
                  </div>
                ) : (
                  <div className="video"></div>
                )}

                {book?.imageUrl?.trim() ? (
                  <div className="image">
                    <picture>
                      <img src={book?.imageUrl} />
                    </picture>
                  </div>
                ) : (
                  <div className="image">
                    <span className="default-img"></span>
                  </div>
                )}
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
                </div>

                <div className="block year">
                  <label>Publish Year: </label>
                  <input
                    type="text"
                    name="publishYear"
                    value={book?.publishYear}
                    onChange={handleInputChange}
                    className=""
                  />
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

                <div className="block year">
                  <label>imageUrl: </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={book?.imageUrl}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div className="block">
                  <label>videoUrl: </label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={book?.videoUrl}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
                <div className="block">
                  <label>themeColor: </label>
                  <input
                    type="text"
                    name="themeColor"
                    value={book?.themeColor}
                    onChange={handleInputChange}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bts">
            <button
              className="bt-secondary bt-update"
              onClick={handleUpdateBook}
            >
              <span className="txt">Update</span>
            </button>
            <Link to={`/books/delete/${book?._id}`}>
              <button className="bt-danger">
                <span className="txt">Delete</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateBook;
