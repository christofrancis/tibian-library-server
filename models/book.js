const mongoose = require("mongoose");

//book Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 1,
      max: 120,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    location: {
      type: String,
      trim: true,
      min: 1,
      max: 120,
      required: false,
    },
    content: {
      type: {},
      min: 1,
      max: 3000,
      required: true,
    },
    finder: {
      type: String,
      trim: true,
      min: 1,
      max: 120,
      required: true,
    },
    keywords: {
      type: String,
      trim: true,
      min: 1,
      max: 120,
      lowercase: true,
    },
    map_pin: {
      type: String,
      trim: true,
      min: 1,
      max: 300,
      required: true,
    },
    cover: {
      type: String,
      trim: true,
      min: 1,
      max: 400,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
