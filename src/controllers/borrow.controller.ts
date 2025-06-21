import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    if (book.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    // Update copies
    book.copies = book.copies - quantity;

    const availableValue = book.copies === 0 ? false : true;
    await book.updateAvailability(availableValue);

    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    await borrow.save();
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      success: false,
      message: "Error borrowing book",
      error: err,
    });
  }
};

const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving borrow summary",
      error: err,
    });
  }
};

export const borrowController = {
  borrowBook,
  getBorrowSummary,
};
