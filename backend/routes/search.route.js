import express from "express";

const router = express.Router();
router.get("/person/:query", searchPerson);
router.get("/movies/:query", searchMovie);
router.get("/tv/:query", searchTv);

export default router;

