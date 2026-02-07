import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

/**
 * STEP 1: Redirect user to Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * STEP 2: Google callback
 */
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

      // ✅ Create JWT (longer expiry)
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // ✅ Redirect directly to dashboard
      res.redirect(`${FRONTEND_URL}/dashboard?token=${token}`);
    } catch (error) {
      console.error("Google auth error:", error);
      res.redirect(`${FRONTEND_URL}/login`);
    }
  }
);

export default router;
