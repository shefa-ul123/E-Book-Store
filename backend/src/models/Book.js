import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4, min: 0, max: 5 },
    stock: { type: Number, required: true, min: 0, default: 0 }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
