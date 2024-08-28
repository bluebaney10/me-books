import { Router } from "express";
import Book from "../models/bookModel";
import { Request, Response } from "express";

const router = Router();

interface BookRequestBody {
  title?: string;
  author?: string;
  publishYear?: number;
}

const validateBookRequestBody = (body: BookRequestBody): boolean => {
  return body.title && body.author ? true : false;
};

router.post("/", async (request: Request, response: Response) => {
  try {
    const { title, author, publishYear }: BookRequestBody = request.body;

    if (!validateBookRequestBody(request.body)) {
      return response.status(400).send({
        message: "Send all require fields:title, author, publishYear",
      });
    }

    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request: Request, response: Response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json(books);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request: Request, response: Response) => {
  try {
    if (!validateBookRequestBody(request.body)) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
