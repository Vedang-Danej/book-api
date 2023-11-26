import express from 'express';
import {
  addBook,
  changeBook,
  getAllBooks,
  getOneBook,
  deleteBook,
} from '../controllers/bookController.js';
import { body } from 'express-validator';

// express-validator is used to make sure that the
// input given by the user matches the schema in the datbase

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getOneBook);

router.post(
  '/',
  body('title').isString().notEmpty(),
  body('authors').isArray().notEmpty(),
  body('description').isString().notEmpty(),
  body('section').isString().notEmpty(),
  body('bookShelf').isNumeric(),
  body('count').isNumeric(),
  body('currentlyLend').isBoolean(),
  addBook
);

router.put('/:id', changeBook);

router.delete('/:id', deleteBook);

export default router;
