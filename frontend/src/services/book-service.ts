import create from "./http-service";

export interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear?: number;
  summary?: string;
  detail?: string;
  imageUrl?: string;
  videoUrl?: string;
  themeColor?: string;
  userCreated: string;
}

export default create("/books");
