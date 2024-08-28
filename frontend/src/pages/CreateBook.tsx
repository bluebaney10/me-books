import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import apiClient from "../services/api-client";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    apiClient
      .post("books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=""
          />
        </div>
        <div className="item">
          <span className="">Author</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className=""
          />
        </div>
        <div className="item">
          <span className="">PublishYear</span>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(Number(e.target.value))}
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
