import create from "./http-service";

export interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear?: number;
}

export default create("/books");
