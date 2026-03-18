import { HttpError } from "../utils/HttpError.js";

export function notFoundHandler(req, _res, next) {
  next(new HttpError(404, `Not found: ${req.method} ${req.originalUrl}`));
}
