const mongoose = require("mongoose");

//contributor Schema
const contributorSchema = new mongoose.Schema(
  {
    name: {
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
    role: {
      type: String,
      trim: true,
      min: 1,
      max: 120,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contributor", contributorSchema);
