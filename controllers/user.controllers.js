import mongoose from "mongoose";
import user from  "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"  


export const Signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
    const { FirstName, LastName, email, mobileNo, password } = req.body;

    // checking if fields are empty
    if (!FirstName || !LastName || !email || !mobileNo || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // checking if user already exists
    const existingUser = await user.findOne({ email }).session(session);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = await user.create([{ 
        FirstName,
        LastName,
        email,
        mobileNo,
        password: hashedPassword 
    }], { session });

         // generate jwt token
        const token = jwt.sign(
            { userId: newUser[0]._id, 
              email: newUser[0].email },
                JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ message: "User registered successfully" });

     
 } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Something went wrong", error: error.message });
 }
}



export const Signin = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
try {
    
    const { email, password } = req.body;

    // checking if fields are empty
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user does not exist
    const user = await user.findOne({ email }).session(session);
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

} catch (error) {
   res.status(500).json({ message: "Something went wrong", error: error.message }); 
}}