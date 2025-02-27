/**
 * @file Request logging middleware
 * @module middleware/requestLogger
 * @description Logs each incoming HTTP request with a timestamp, HTTP method, and requested URL.
 */

export const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
