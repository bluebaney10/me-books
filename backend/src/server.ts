import express from "express";
import mongoose from "mongoose";
import connectDB from "./db";

const app = express();
const PORT = 3333;

// Connect to MongoDB
connectDB();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Tutorial");
});

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));

declare var process: {
  env: {
    mongoDBURL: string;
  };
};

/* console.log("process.env.mongoDBURL:", process.env.mongoDBURL);
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
 */
