import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ENV_VARS } from "../config/envVars.js"

export const protectRoute = async (req, resizeBy, next) => {
    try {
        const token = req.cookies["jwt-netflix"]

        if(!token){
            return resizeBy.status(401).json({
                success: false,
                message: "unauthorized - No token provided"
            })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if(!decoded){
            return resizeBy.status(401).json({
                success: false,
                message: "Unauthorized - Invalid Token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        
        req.user = user;
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: " ,error.message);;
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
        
    }
}