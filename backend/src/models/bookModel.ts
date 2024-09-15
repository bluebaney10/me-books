import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  publishYear: number;
  imageUrl: string;
  videoUrl: string;
  summary: string;
  detail: string;
  themeColor: string;
  userCreated: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    summary: {
      type: String,
    },
    detail: {
      type: String,
    },
    themeColor: {
      type: String,
    },
    userCreated: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
