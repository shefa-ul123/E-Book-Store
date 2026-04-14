import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "../models/Book.js";

dotenv.config();

const sampleBooks = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Fiction",
    description: "A psychological thriller with shocking twists.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    price: 18.99,
    rating: 4.5,
    stock: 40
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    description: "Essential craftsmanship principles for software developers.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600",
    price: 32.5,
    rating: 4.8,
    stock: 30
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    description: "Practical guide to building good habits and breaking bad ones.",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
    price: 16.75,
    rating: 4.7,
    stock: 50
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Education",
    description: "Rules for focused success in a distracted world.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
    price: 15.0,
    rating: 4.4,
    stock: 35
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    description: "How to build products customers actually want.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
    price: 21.99,
    rating: 4.3,
    stock: 25
  }
];

const runSeed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Book.deleteMany();
  await Book.insertMany(sampleBooks);
  console.log("Books seeded successfully");
  await mongoose.connection.close();
};

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
