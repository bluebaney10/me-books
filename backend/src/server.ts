import express from "express";
import mongoose from "mongoose";
import connectDB from "./db";
import Book from "./models/bookModel";

const app = express();
const PORT = 3333;

connectDB();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Tutorial");
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));
