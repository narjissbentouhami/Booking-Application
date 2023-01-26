import express from "express";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenreLivres,
  getGenres,
  updateGenre,
} from "../controllers/genre";
import Genre from "../models/Genre";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createGenre);

//UPDATE
router.put("/:id", verifyAdmin, updateGenre);
//DELETE
router.delete("/:id", verifyAdmin, deleteGenre);
//GET

router.get("/find/:id", getGenre);
//GET ALL

router.get("/", getGenres);
router.get("/livre/:id", getGenreLivres);

export default router;
