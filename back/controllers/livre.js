import Livre from "../models/Livre";
import Genre from "../models/Genre";
import { createError } from "../utils/error.js";

export const createLivre = async (req, res, next) => {
  const genreId = req.params.genreid;
  const newLivre = new Livre(req.body);

  try {
    const savedLivre = await newLivre.save();
    try {
      await Genre.findByIdAndUpdate(genreId, {
        $push: { livres: savedLivre._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedLivre);
  } catch (err) {
    next(err);
  }
};

export const updateLivre = async (req, res, next) => {
  try {
    const updatedLivre = await Livre.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLivre);
  } catch (err) {
    next(err);
  }
};
export const updateLivreAvailability = async (req, res, next) => {
  try {
    await Livre.updateOne(
      { "livreNumbers._id": req.params.id },
      {
        $push: {
          "livreNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Livre status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteLivre = async (req, res, next) => {
  const genreId = req.params.genreid;
  try {
    await Livre.findByIdAndDelete(req.params.id);
    try {
      await Genre.findByIdAndUpdate(genreId, {
        $pull: { livres: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("livre has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getLivre = async (req, res, next) => {
  try {
    const livre = await Livre.findById(req.params.id);
    res.status(200).json(livre);
  } catch (err) {
    next(err);
  }
};
export const getLivres = async (req, res, next) => {
  try {
    const livres = await Livre.find();
    res.status(200).json(livres);
  } catch (err) {
    next(err);
  }
};
