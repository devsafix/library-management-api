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

export const bookController = {
  createBook,
};
