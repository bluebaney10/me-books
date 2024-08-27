"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const booksRoute_1 = __importDefault(require("./routes/booksRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3333;
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to Tutorial");
});
app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));
app.use("/books", booksRoute_1.default);
