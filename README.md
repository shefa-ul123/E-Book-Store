
# Online Book Store (MERN)

Complete end-to-end online bookstore using:

- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication with role-based access

## Features

- User registration/login/logout
- Role-based access (`customer`, `admin`)
- Landing page with hero, categories, and featured books
- Book listing with search and category filters
- Book details page and add-to-cart flow
- Persistent shopping cart (localStorage)
- Checkout form and order creation
- Order history for customers
- Admin dashboard for inventory and all orders
- RESTful backend APIs with middleware and error handling

## Project Structure

```text
backend/   # Express API + MongoDB models
frontend/  # React app with Tailwind UI
```

## Run Locally

### 1) Backend setup

```bash
cd backend
npm install
```

Seed sample books:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

### 2) Frontend setup

```bash
cd ../frontend
npm install
```

Start frontend:

```bash
npm run dev
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders` (admin)
- `PATCH /api/orders/:id/status` (admin)
- `POST /api/admin/books` (admin)
- `PUT /api/admin/books/:id` (admin)
- `DELETE /api/admin/books/:id` (admin)

## Admin Access

Users register as `customer` by default. To test admin features, update a user role in MongoDB:

js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } });


