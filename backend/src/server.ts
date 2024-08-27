import express from "express";
import mongoose from "mongoose";
import connectDB from "./db";
import Book from "./models/bookModel";
import router from "./routes/booksRoute";
import cors from "cors";

const app = express();
const PORT = 3333;

connectDB();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Tutorial");
});

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));

app.use("/books", router);
