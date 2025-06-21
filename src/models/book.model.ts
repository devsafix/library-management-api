import { model, Schema } from "mongoose";
import { IBook, IBookMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBookMethods>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Instance method
bookSchema.method(
  "updateAvailability",
  async function (availableValue: boolean) {
    this.available = availableValue;
    await this.save();
  }
);

export const Book = model<IBookMethods>("Book", bookSchema);
