import express from "express";

const server = express();
const PORT = 3333;

server.listen(PORT, () => console.log(`Server is started at port ${PORT}`));
