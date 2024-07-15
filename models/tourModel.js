// const { duration, Select } = require('@material-ui/core');
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a Name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a Price'],
  },
  priceDiscount: Number,

  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, ' A tour must have an cover image'],
  },
  images: [String],
  cretaeAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },

  startDates: [Date],
});

//model////

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
