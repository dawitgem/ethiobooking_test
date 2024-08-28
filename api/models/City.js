import mongoose from "mongoose";
const { Schema } = mongoose;

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("City", CitySchema);
