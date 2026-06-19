import { ZodError }
from "zod";

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  if (err instanceof ZodError) {

    return res.status(400).json({
      success: false,

      errors: err.issues.map(
        (issue) => ({
          field: issue.path[0],
          message: issue.message,
        })
      ),
    });

  }

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });

};

export default errorHandler;