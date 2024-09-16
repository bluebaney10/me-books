import { Link } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { useState } from "react";
import { Hilight } from "../components/Hilight";
import "../styles/pages/home.css";

const Home = () => {
  const { books, error, loading } = useBooks();
  const [selectedId, setSelectedId] = useState("");
  const [summaryId, setSummaryId] = useState("");

  const onClickDetail = (id: string) => {
    setSelectedId(id);
    setSummaryId("");
  };

  const onClickSummary = (id: string) => {
    if (id != summaryId) {
      setSummaryId(id);
    } else {
      setSummaryId("");
    }
    setSelectedId("");
  };

  return (
    <>
      <Hilight title="Book List" />
      <section className="home">
        <div className="container">
          {error && <p className="text-danger">{error}</p>}
          {loading && <div className="text-center pad-top-16">Loadding...</div>}
          {books.length === 0 && (
            <span className="text-center">Book Empty !!!</span>
          )}
          <div className="items">
            {books.map((book) => (
              <div
                className={
                  selectedId == book._id
                    ? "item show-detail"
                    : summaryId == book._id
                    ? "item flip"
                    : "item"
                }
                key={book._id}
              >
                <div className="perspective">
                  <div className="book" data-book="book-1">
                    <div className="cover">
                      <div className="front">
                        {book.imageUrl?.trim() ? (
                          <picture>
                            <img src={book.imageUrl} />
                          </picture>
                        ) : (
                          <span className="default-img"></span>
                        )}
                      </div>
                      <div
                        className="side"
                        style={{
                          backgroundColor: book?.themeColor?.trim(),
                        }}
                      >
                        <div className="spin">
                          <span className="txt">{book.title}</span>
                        </div>
                      </div>
                      <div
                        className="back"
                        style={{
                          backgroundColor: book?.themeColor?.trim(),
                        }}
                      >
                        <p>{book.summary}</p>
                      </div>
                      <div className="inner inner-left"></div>
                    </div>
                    <div className="inner inner-right"></div>
                  </div>
                </div>
                <div className="buttons">
                  <button onClick={() => onClickSummary(book._id)}>
                    <span className="txt">Summary</span>
                  </button>
                  <button onClick={() => onClickDetail(book._id)}>
                    <span className="txt">Details</span>
                  </button>
                  <Link to={`/books/show/${book._id}`}>
                    <span className="txt">view</span>
                  </Link>
                </div>
                <div className="texts">
                  <h2 className="title">{book.title}</h2>
                  <h3 className="author">{book.author}</h3>
                </div>
                <div className="details">
                  <ul>
                    <li>{book.detail}</li>
                    <li>{book.author}</li>
                  </ul>
                  <button
                    className="bt-close"
                    onClick={() => setSelectedId("")}
                  ></button>
                </div>

                <div className="bg"></div>
              </div>
            ))}
            <div className="bg"></div>
          </div>
        </div>
        <div
          className={selectedId !== "" ? "screen active" : "screen"}
          onClick={() => setSelectedId("")}
        ></div>
      </section>
    </>
  );
};

export default Home;
