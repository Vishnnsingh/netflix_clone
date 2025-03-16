import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS ={
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    API_KEY: process.env.API_KEY,
    API_HOST: process.env.API_HOST,
    TMDB_API_KEY: process.env.TMDB_API_KEY
}
// console.log("Loaded API_KEY from .env:", ENV_VARS.API_KEY);