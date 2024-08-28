import apiClient from "./api-client";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  publishYear?: number;
}

class BookService {
  getAllBooks() {
    const controller = new AbortController();
    const request = apiClient.get<Book[]>("/books", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getBook(id: string) {
    const controller = new AbortController();
    const request = apiClient.get<Book>(`books/${id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  createBook(book: Book) {
    return apiClient.post("books", book);
  }

  updateBook(book: Book) {
    return apiClient.put<Book>(`books/${book._id}`, book);
  }

  deleteBook(id: string) {
    return apiClient.delete(`books/${id}`);
  }
}

export default new BookService();
