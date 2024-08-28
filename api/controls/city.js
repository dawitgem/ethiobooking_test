import City from "../models/City.js";

// CREATE
export const createCity = async (req, res, next) => {
  const newCity = new City(req.body);

  try {
    const savedCity = await newCity.save();
    res.status(200).json(savedCity);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateCity = async (req, res, next) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCity);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteCity = async (req, res, next) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json("City has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET
export const getCity = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);
    res.status(200).json(city);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getCities = async (req, res, next) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
};
