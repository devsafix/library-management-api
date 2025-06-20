import express from "express";
import { bookController } from "../controllers/book.controller";

const bookRoutes = express.Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.get("/", bookController.getAllBooks);

export default bookRoutes;
