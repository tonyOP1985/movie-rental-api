const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255
    },
    // representation of model
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    // this is what the client sends
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(100)
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
