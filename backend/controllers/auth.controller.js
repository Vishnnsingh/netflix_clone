import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrateTokenAndSetCokkeis } from "../utils/generateToken.js";
export async function signup(req, res) {
    // res.send("Signup route");

    try {
        const {email,password,username} =req.body;

        if(!email || !password || !username){
            return res.status(400).json({
                success:false, 
                message:"Allfields are required"})
        }

        const emailRagex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if(!emailRagex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters" 
            })
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }
        
        const existingUserByUsernmae = await User.findOne({username:username})

        if(existingUserByUsernmae){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];  // see frontend time

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];


        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        })
         
            genrateTokenAndSetCokkeis(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                success: true,
                user: {
                     ...newUser._doc,
                    password: "",
                },
            });
    
        
      

      
    } catch (error) {
        console.log("Error in the signup controller", error.message);
        
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    
}

export async function login(req, res) {
    // res.send("Login route");
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({
            email:email
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        genrateTokenAndSetCokkeis(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            }
        })
    } catch (error) {
        console.log("Error in login conroller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        
    }
    
}

export async function logout(req, res) {
    // res.send("Logout route");
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success: true,
            message: "Logged out successfuly"
        })
        
    } catch (error) {
        console.log("Enter in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
    
}
