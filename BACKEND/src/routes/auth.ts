import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

// STEP 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// STEP 2: Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    try {
      const profile: any = req.user;

      const email = profile.emails?.[0]?.value;
      const googleId = profile.id;
      const userName = profile.displayName;
      const profileImage = profile.photos?.[0]?.value;

      if (!email) {
        return res.redirect(`${FRONTEND_URL}/login`);
      }

   
      let user = await UserModel.findOne({ email });

      if (user) {
        if (!user.googleId) {
          user.googleId = googleId;
          user.provider = "google";
          user.profileImage = profileImage;
          await user.save();
        }
      } else {
        user = await UserModel.create({
          userName,
          email,
          googleId,
          provider: "google",
          profileImage,
        });
      }

     
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

    
      res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (err) {
      console.error("Google auth error:", err);
      res.redirect(`${FRONTEND_URL}/login`);
    }
  }
);

export default router;
