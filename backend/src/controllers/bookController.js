import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";

export const getBooks = asyncHandler(async (req, res) => {
  const { search = "", category = "", page = 1, limit = 12 } = req.query;
  const filter = {
    ...(category ? { category } : {}),
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
          ]
        }
      : {})
  };

  const skip = (Number(page) - 1) * Number(limit);
  const [books, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Book.countDocuments(filter)
  ]);

  res.json({
    books,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit))
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});
