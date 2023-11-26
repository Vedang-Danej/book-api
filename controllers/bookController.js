import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import { validationResult } from 'express-validator';

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

export const getOneBook = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (book) res.json(book);
  else throw new Error('Book not found');
});

export const addBook = asyncHandler(async (req, res) => {
  // checking if validator has thrown any errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Input validation failed');
  }
  const { title, authors, description, section, bookShelf, thumbnail, count, currentlyLend } =
    req.body;
  // the request reaches here only if it has been validated by express-validator in
  // routes/bookRoutes.js
  const book = new Book({
    title,
    authors,
    description,
    section,
    bookShelf,
    thumbnail,
    count,
    currentlyLend,
  });
  const addedBook = await book.save();
  res.status(201).json(addedBook);
});

export const changeBook = asyncHandler(async (req, res) => {
  const { title, authors, description, section, bookShelf, thumbnail, count, currentlyLend } =
    req.body;
  const book = await Book.findById(req.params.id);
  //   only updating the entry if it is present in the request body
  if (!book) throw new Error('Book not found');
  if (title) book.title = title;
  if (authors) book.authors = authors;
  if (description) book.description = description;
  if (section) book.section = section;
  if (bookShelf) book.bookShelf = bookShelf;
  if (thumbnail) book.thumbnail = thumbnail;
  if (count) book.count = count;
  if (currentlyLend) book.currentlyLend = currentlyLend;
  book.save();
  res.json(book);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new Error('Book not found');
  await Book.deleteOne({ _id: req.params.id });
  res.json({ message: `The book with ID ${req.params.id} has been deleted` });
});
