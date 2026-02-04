import express, { Request, Response } from "express";
import { UserModel } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userAuth } from "../middlewares/auth";
import { BlacklistModel } from "../models/blacklist";
import { z } from "zod";
import bcrypt from "bcrypt";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const router = express.Router();

/* ---------------- SIGNUP ---------------- */

const signupSchema = z.object({
  userName: z.string().min(3).max(20).trim(),
  email: z.string().email(),
  password: z.string().min(6),
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

    const { userName, email, password } = result.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
});

/* ---------------- LOGIN ---------------- */

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
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

    const { email, password } = result.data;

   const existingUser = await UserModel.findOne({ email });
if (!existingUser) {
  return res.status(400).json({ message: "Invalid credentials" });
}

if (!existingUser.password) {
  return res.status(400).json({
    message: "Please login using Google",
  });
}

const isMatch = await bcrypt.compare(
  password,
  existingUser.password
);

if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
}


    const token = jwt.sign(
      { id: existingUser._id, userName: existingUser.userName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error during login",
    });
  }
});

/* ---------------- UPDATE PROFILE ---------------- */

router.put("/profile", userAuth, async (req, res) => {
  try {
    const { userName, password } = req.body;

    const updateData: any = {};

    if (userName) updateData.userName = userName;

    if (password) {
      // 🔐 HASH NEW PASSWORD
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      // @ts-ignore
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------- GET PROFILE ---------------- */

router.get("/profile", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    res.json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------- LOGOUT ---------------- */

router.post("/logout", userAuth, async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ message: "Token missing!" });
    }

    await BlacklistModel.create({ token });

    res.json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
