import { HttpError } from "../utils/HttpError.js";

export function errorHandler(err, _req, res, _next) {
  const isHttp = err instanceof HttpError;
  const status = isHttp ? err.statusCode : 500;

  res.status(status).json({
    error: isHttp ? err.message : "Internal Server Error",
  });
}
