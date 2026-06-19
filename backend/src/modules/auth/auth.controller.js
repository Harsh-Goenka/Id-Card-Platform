import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "./auth.service.js";

import {
  refreshCookieOptions,
} from "../../utils/cookies.js";

import asyncHandler
from "../../utils/asyncHandler.js";


export const register =
  asyncHandler(
    async (req, res) => {

      const validatedData =
        registerSchema.parse(
          req.body
        );

      const user =
        await registerUser(
          validatedData
        );

      return res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        data: user,
      });

    }
  );

export const login =
  asyncHandler(
    async (req, res) => {

      const validatedData =
        loginSchema.parse(
          req.body
        );

      const result =
        await loginUser(
          validatedData
        );

      res.cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      );

      return res.status(200).json({
        success: true,

        message:
          "Login successful",

        data: {
          user: result.user,
          accessToken:
            result.accessToken,
        },
      });

    }
  );

export const getMe =
  asyncHandler(
    async (req, res) => {

      return res.status(200).json({
        success: true,
        data: req.user,
      });

    }
  );



  export const refresh =
  asyncHandler(
    async (req, res) => {

      const refreshToken =
        req.cookies.refreshToken;

      const accessToken =
        await refreshAccessToken(
          refreshToken
        );

      return res.status(200).json({
        success: true,
        accessToken,
      });

    }
  );

export const logout =
  asyncHandler(
    async (req, res) => {

      await logoutUser(
        req.user._id
      );

      res.clearCookie(
        "refreshToken"
      );

      return res.status(200).json({
        success: true,
        message:
          "Logout successful",
      });

    }
  );