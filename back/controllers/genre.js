import Genre from "../models/Genre";
import Livre from "../models/Livre";

export const createGenre = async (req, res, next) => {
  const newGenre = new Genre(req.body);

  try {
    const savedGenre = await newGenre.save();
    res.status(200).json(savedGenre);
  } catch (err) {
    next(err);
  }
};
export const updateGenre = async (req, res, next) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedGenre);
  } catch (err) {
    next(err);
  }
};
export const deleteGenre = async (req, res, next) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json("genre has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.status(200).json(genre);
  } catch (err) {
    next(err);
  }
};
export const getGenres = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const genres = await Genre.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
};

export const getGenreLivres = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    const list = await Promise.all(
      genre.livres.map((livres) => {
        return Livre.findById(livre);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
