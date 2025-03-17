import express from "express"
import { gettopTv, getTrendingTv, getTrendingTvPopular, getupcomingTv } from "../controllers/tv.controller.js";


const router = express.Router();

router.get("/trendingtv", getTrendingTv)
router.get("/trendingtvpopular", getTrendingTvPopular)
router.get("/topTv", gettopTv)
router.get("/upcomingTv", getupcomingTv)
export default router;