/**
 * @file Global error handling middleware
 * @module middleware/errorHandler
 * @description Handles application errors by logging them and returning appropriate responses based on the request type.
 *
 * Logs the error and responds with an HTML or JSON error message based on the request's accepted content type.
 */

const renderErrorPage = (res, statusCode, message, stack) => {
  res.status(statusCode).render("errorTemplate", {
    error: message,
    statusCode,
    stack: process.env.NODE_ENV === "development" ? stack : undefined,
  });
};

const sendJsonError = (res, statusCode, message) => {
  res.status(statusCode).json({
    error: message,
    statusCode,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (req.accepts("html")) {
    return renderErrorPage(res, statusCode, message, err.stack);
  } else {
    return sendJsonError(res, statusCode, message);
  }
};
