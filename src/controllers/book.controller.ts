import { Request, Response } from "express";
import { Book } from "../models/book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const result = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error creating book",
      error: err,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) || "desc";
    const limit = parseInt(req.query.limit as string) || 10;

    const condition = filter ? { genre: filter } : {};

    const books = await Book.find(condition)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: books,
      message: "Books retrieved successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error retrieving books",
      error: err,
    });
  }
};

export const bookController = {
  createBook,
  getAllBooks,
};
