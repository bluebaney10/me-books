import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Spinner from "../components/Spinner";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";
import { Hilight } from "../components/Hilight";
import "../styles/pages/page.css";

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
      <Hilight title="Book Infomation" />
      <section className="page show-book">
        <div className="container">
          <ButtonBack />
          {error && <p className="">{error}</p>}
          {loading ? <Spinner /> : ""}
          <div className="items">
            <div className="item">
              <div className="media">
                {books?.videoUrl?.trim() ? (
                  <div className="video">
                    <iframe
                      src={`https://www.youtube.com/embed/${books?.videoUrl}`}
                    ></iframe>
                  </div>
                ) : (
                  <div className="video"></div>
                )}

                {books?.imageUrl?.trim() ? (
                  <div className="image">
                    <picture>
                      <img src={books?.imageUrl} />
                    </picture>
                  </div>
                ) : (
                  <div className="image">
                    <span className="default-img"></span>
                  </div>
                )}
              </div>

              <div className="texts">
                <div className="flex title">
                  <h2>{books?.title}</h2>
                </div>
                <div className="flex author">
                  <h3>
                    <b>Author: </b>
                  </h3>
                  <h3>{books?.author}</h3>
                </div>
                <div className="flex year">
                  <h3>
                    <b>Publish Year: </b>
                  </h3>
                  <h3>{books?.publishYear}</h3>
                </div>
                <div className="block details">
                  <span className="txt">
                    <b>Summary:</b>
                  </span>
                  <span className="txt">{books?.summary}</span>
                </div>
                <div className="block details">
                  <span className="txt">
                    <b>Detail:</b>
                  </span>
                  <span className="txt">{books?.detail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowBook;
