import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import apiClient, { CanceledError } from "../services/api-client";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    apiClient
      .delete(`books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <>
      <BackButton />
      <h2>Delete Book</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? <Spinner /> : ""}

      <div className="">
        <h3 className="">Are you sure you want to delete this book</h3>
        <button className="" onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </>
  );
};

export default DeleteBook;
