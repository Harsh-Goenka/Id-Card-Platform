import jwt from "jsonwebtoken";

import AppError
from "../utils/AppError.js";

import { User }
from "../modules/auth/auth.model.js";

import asyncHandler
from "../utils/asyncHandler.js";

import env from "../config/env.js";

export const protect =
  asyncHandler(
    async (req, res, next) => {

      let token;

      const authHeader =
        req.headers.authorization;

      if (
        authHeader &&
        authHeader.startsWith(
          "Bearer "
        )
      ) {
        token =
          authHeader.split(
            " "
          )[1];
      }

      if (!token) {
        throw new AppError(
          "Not authorized",
          401
        );
      }

      const decoded =
        jwt.verify(
          token,
          env
            .JWT_ACCESS_SECRET
        );

      const user =
        await User.findById(
          decoded.id
        ).select(
          "-password -refreshToken"
        );

      if (!user) {
        throw new AppError(
          "User no longer exists",
          401
        );
      }

      req.user = user;

      next();

    }
  );