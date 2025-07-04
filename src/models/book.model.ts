import { model, Schema } from "mongoose";
import { IBookMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBookMethods>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String },
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
bookSchema.methods.decreaseCopies = async function (quantity: number) {
  this.copies = this.copies - quantity;
  if (this.copies < 0) this.copies = 0;

  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }

  await this.save();
};

bookSchema.methods.updateAvailable = async function (copies: number) {
  this.available = copies > 0;
};

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

export const Book = model<IBookMethods>("Book", bookSchema);
