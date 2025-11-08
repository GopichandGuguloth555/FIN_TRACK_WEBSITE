import express, { Request, Response } from "express";
import { UserModel } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userAuth } from "../middlewares/auth";
import { BlacklistModel } from "../models/blacklist";
import { z } from "zod";


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const router = express.Router();


const signupSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const loginSchema = z.object({
  userName: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

router.post("/signup", async (req, res) => {
  try {
    
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { userName, password } = result.data;

    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = await UserModel.create({ userName, password });
    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { userName, password } = result.data;

    const existingUser = await UserModel.findOne({ userName });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials! (User not found)" });
    }

    if (existingUser.password !== password) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials! (Wrong password)" });
    }

    const token = jwt.sign(
      { id: existingUser._id, userName: existingUser.userName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error during login",
      error: (error as Error).message,
    });
  }
});



router.put("/profile", userAuth, async (req, res) => {

  try {
    const { userName, password } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(

      //@ts-ignore
      req.user.id,
      { userName, password },
      { new: true }

    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Internal Server Eroor!"
      });
    }

    res.json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });

  }
  catch (error) {

    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

})

router.get("/profile", userAuth, async (req, res) => {
  try {
    //@ts-ignore
    const user = await UserModel.findById(req.user.id).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    res.json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", userAuth, async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ message: "Token missing!" });
    }

    await BlacklistModel.create({ token });

    res.json({ message: "User logged out successfully!" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
