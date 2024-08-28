import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  publishYear: number;
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
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
