import express from "express";
import {
  createLivre,
  deleteLivre,
  getLivre,
  getLivres,
  updateLivre,
  updateLivreAvailability,
} from "../controllers/livre";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:livreid", verifyAdmin, createLivre);

//UPDATE
router.put("/availability/:id", updateLivreAvailability);
router.put("/:id", verifyAdmin, updateLivre);
//DELETE
router.delete("/:id/:genreid", verifyAdmin, deleteLivre);
//GET

router.get("/:id", getLivre);
//GET ALL

router.get("/", getLivres);

export default router;
