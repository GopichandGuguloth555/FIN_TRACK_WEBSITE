import { UserModel } from "../models/User";
import { Request,Response,NextFunction } from "express";

const premiumOnly = async (req:Request, res:Response, next:NextFunction) => {
  // @ts-ignore
  const userId = req.user.id;

  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.isPremium) {
    return res.status(403).json({
      message: "Upgrade to premium to access analytics",
    });
  }

  next();
};

export default premiumOnly;