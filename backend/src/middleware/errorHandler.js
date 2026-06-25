import { ZodError } from "zod";

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  if (err instanceof ZodError) {

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });

  }

  return res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });

};

export default errorHandler;