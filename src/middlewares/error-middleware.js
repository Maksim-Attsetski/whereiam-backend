import { ApiError } from "../exceptions/api-error.js";

export default (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    const { status, message, errors } = err;
    return res.status(status).json({ message, errors });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
