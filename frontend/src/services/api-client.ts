import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://me-books-api.onrender.com",
  headers: {
    "api-key": "can put api key this",
  },
});

export { CanceledError };
