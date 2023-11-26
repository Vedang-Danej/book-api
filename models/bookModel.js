import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  bookShelf: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'None',
  },
  count: {
    type: Number,
    required: true,
  },
  currentlyLend: {
    type: Boolean,
    required: true,
    defalt: false,
  },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
