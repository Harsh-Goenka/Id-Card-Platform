import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../src/modules/auth/auth.model.js";

const seedAdmin = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    const email =
      "admin@test.com";

    const password =
      "Admin@123";

    let user =
      await User.findOne({
        email,
      });

    if (!user) {

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );

      user =
        await User.create({

          name: "Harsh",

          email,

          password:
            hashedPassword,

          role: "admin",

        });

      console.log(
        "✅ Admin user created."
      );

    } else {

      console.log(
        "ℹ️ Admin user already exists."
      );

    }

    const accessToken =
      jwt.sign(

        {

          id: user._id,

          role: user.role,

        },

        process.env.JWT_ACCESS_SECRET,

        {

          expiresIn: "15m",

        }

      );

    console.log("\n====================");

    console.log(
      "Email:",
      email
    );

    console.log(
      "Password:",
      password
    );

    console.log(
      "\nAccess Token:\n"
    );

    console.log(
      accessToken
    );

    console.log(
      "\n===================="
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

};

seedAdmin();