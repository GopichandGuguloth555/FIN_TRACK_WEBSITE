import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { BlacklistModel } from "../models/blacklist";

import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Auth token missing!" });

        const blacklisted = await BlacklistModel.findOne({ token });
        if (blacklisted) return res.status(401).json({ message: "Token is invalid (logged out)" });

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await UserModel.findById(decoded.id);

        if (!user) return res.status(404).json({ message: "User not found!" });

        //@ts-ignore
        req.user = { id: user._id, userName: user.userName };
        next();
    }
    catch (error) 
    {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};
