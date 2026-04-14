import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Book from "../models/Book.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingInfo, paymentMethod } = req.body;
  if (!items?.length) {
    res.status(400);
    throw new Error("No order items");
  }

  const bookIds = items.map((item) => item.bookId);
  const books = await Book.find({ _id: { $in: bookIds } });
  const bookMap = new Map(books.map((b) => [String(b._id), b]));

  const normalizedItems = items.map((item) => {
    const book = bookMap.get(String(item.bookId));
    if (!book) throw new Error("Book unavailable");
    if (book.stock < Number(item.quantity)) {
      throw new Error(`Insufficient stock for ${book.title}`);
    }
    book.stock -= Number(item.quantity);
    return {
      book: book._id,
      title: book.title,
      image: book.image,
      price: book.price,
      quantity: Number(item.quantity)
    };
  });

  const totalPrice = normalizedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await Promise.all(books.map((book) => book.save()));

  const order = await Order.create({
    user: req.user._id,
    items: normalizedItems,
    shippingInfo,
    paymentMethod,
    totalPrice
  });

  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});
