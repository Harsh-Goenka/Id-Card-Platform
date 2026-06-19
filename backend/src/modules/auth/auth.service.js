import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User }
from "./auth.model.js";

import AppError
from "../../utils/AppError.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.js";

export const registerUser = async (
  userData
) => {

  const existingUser =
    await User.findOne({
      email: userData.email,
    });

  if (existingUser) {

    throw new AppError(
      "Email already exists",
      409
    );

  }

  const hashedPassword =
    await bcrypt.hash(
      userData.password,
      12
    );

  const user =
    await User.create({
      name: userData.name,

      email: userData.email,

      password:
        hashedPassword,
    });

  return {
    id: user._id,

    name: user.name,

    email: user.email,

    role: user.role,
  };
};

export const loginUser = async (
  loginData
) => {

  const user =
    await User.findOne({
      email: loginData.email,
    });

  if (!user) {

    throw new AppError(
      "Invalid email or password",
      401
    );

  }

  const isPasswordCorrect =
    await bcrypt.compare(
      loginData.password,
      user.password
    );

  if (!isPasswordCorrect) {

    throw new AppError(
      "Invalid email or password",
      401
    );

  }

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  user.refreshToken =
    refreshToken;

  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    accessToken,

    refreshToken,
  };

};



export const refreshAccessToken =
  async (refreshToken) => {

    if (!refreshToken) {

      throw new AppError(
        "Refresh token missing",
        401
      );

    }

    let decoded;

    try {

      decoded = jwt.verify(
        refreshToken,
        process.env
          .JWT_REFRESH_SECRET
      );

    } catch {

      throw new AppError(
        "Invalid refresh token",
        401
      );

    }

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      throw new AppError(
        "User not found",
        401
      );

    }

    if (
      user.refreshToken !==
      refreshToken
    ) {

      throw new AppError(
        "Refresh token mismatch",
        401
      );

    }

    const accessToken =
      generateAccessToken(user);

    return accessToken;

  };


export const logoutUser =
  async (userId) => {

    await User.findByIdAndUpdate(
      userId,
      {
        refreshToken: null,
      }
    );

  };