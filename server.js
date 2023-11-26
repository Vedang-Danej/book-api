import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// please check models/bookModel.js for detailed schema

// data format of a book
// {
//     title ->String, required,
//     authors (author(s) of the book)->array of strings, required
//     description->string, required
//     section (section of the library to which the book belongs) -> string, required
//     bookShelf (section's bookshlef where the book is kept) -> number, required
//     thumbnail -> string, not required
//     count (number of books available) -> number, required
//     currentlyLend (if the book(s) is lend to someone or not) -> boolean, required
// }

// configuring setting environment variables
dotenv.config();

// connecting to database
connectDB();

const app = express();

app.use(express.json());

app.use('/api/books', bookRoutes);

// handler for when the route requested is not handled by the server
app.use(notFound);

// main error handler for the server
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('API is running...'));
