import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";

export const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  Object.assign(book, req.body);
  const updated = await book.save();
  res.json(updated);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  await book.deleteOne();
  res.json({ message: "Book deleted" });
});
