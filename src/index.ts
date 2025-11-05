import express from "express";
import { UserModel } from "./db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;


const app = express();
const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { userName, password } = req.body;

        const existingUser = await UserModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!",
            });
        }

        const newUser = await UserModel.create({
            userName,
            password,
        });

        res.status(201).json({
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

app.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        const existingUser = await UserModel.findOne({ userName });
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid Credentials! (User not found)",
            });
        }

        if (existingUser.password !== password) {
            return res.status(400).json({
                message: "Invalid Credentials! (Wrong password)",
            });
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

    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error during login",
            error: (error as Error).message,
        });
    }
});



app.get("/", (req, res) => {
    res.json({
        message: "Starting the new porject FINT_TRACK !"
    })
})

app.listen(port, () => {

    console.log("Server is running on the port 3000! ✅");
})
