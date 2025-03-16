import express from "express"
import {  getMovieCast, getMovieDeatils, getMovieDirector, getMovieRating, getMovieWriter, gettopBoxOfficeMovies, gettopMovies, getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie)
router.get("/topMovies", gettopMovies)
router.get("/topBoxOffice", gettopBoxOfficeMovies)
router.get("/:id/cast", getMovieCast)
router.get("/:id/details", getMovieDeatils)
router.get("/:id/rating", getMovieRating)
router.get("/:id/director", getMovieDirector)
router.get("/:id/writer", getMovieWriter)

export default router;