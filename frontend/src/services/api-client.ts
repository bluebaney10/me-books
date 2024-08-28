import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "api-key": "can put api key this",
  },
});

export { CanceledError };
