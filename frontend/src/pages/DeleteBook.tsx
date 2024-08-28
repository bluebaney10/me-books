import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3333/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
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
