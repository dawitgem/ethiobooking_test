import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createCity,
  deleteCity,
  getCities,
  getCity,
  updateCity,
} from "../controls/city.js";

const router = express.Router();
//CREATE
router.post("/createCity", verifyAdmin, createCity);

//UPDATE

router.put("/find/:id", verifyAdmin, updateCity);

//DELETE

router.delete("/find/:id", verifyAdmin, deleteCity);

//GET

router.get("/find/:id", getCity);

//GET ALL
router.get("/city", getCities);

export default router;
