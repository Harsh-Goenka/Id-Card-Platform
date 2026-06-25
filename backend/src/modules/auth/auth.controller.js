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

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import {
  refreshCookieOptions,
} from "../../utils/cookies.js";

export const register =
  asyncHandler(async (req, res) => {

    const validatedData =
      registerSchema.parse(req.body);

    const user =
      await registerUser(validatedData);

    return res
      .status(201)
      .json(
        new ApiResponse(
          "User registered successfully",
          user
        )
      );

  });

export const login =
  asyncHandler(async (req, res) => {

    const validatedData =
      loginSchema.parse(req.body);

    const result =
      await loginUser(validatedData);

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Login successful",
          {
            user: result.user,
            accessToken:
              result.accessToken,
          }
        )
      );

  });

export const getMe =
  asyncHandler(async (req, res) => {

    return res
      .status(200)
      .json(
        new ApiResponse(
          "User fetched successfully",
          req.user
        )
      );

  });

export const refresh =
  asyncHandler(async (req, res) => {

    const refreshToken =
      req.cookies.refreshToken;

    const accessToken =
      await refreshAccessToken(
        refreshToken
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Access token refreshed successfully",
          {
            accessToken,
          }
        )
      );

  });

export const logout =
  asyncHandler(async (req, res) => {

    await logoutUser(req.user._id);

    res.clearCookie("refreshToken");

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Logout successful"
        )
      );

  });