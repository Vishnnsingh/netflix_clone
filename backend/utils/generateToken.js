import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const genrateTokenAndSetCokkeis = (userId, res) =>{
 const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,
    {expiresIn: "15d"});

 res.cookie("jwt-netflix", token,{
   maxAge: 15 * 24 *60 * 60 *1000, // in 15days in ms
   httpOnly: true, // prevent xss attacks cross-site scripting attacks, make it not be accessed bt js
   sameSite: "strict",
   secure: ENV_VARS.NODE_ENV !== "development",
 });

 return token;
};
