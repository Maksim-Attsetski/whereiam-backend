import { validationResult } from "express-validator";

import { ApiError } from "../exceptions/api-error.js";

export const validation = async (req) => {
  try {
    const isBodyInvalid = validationResult(req);
    if (!isBodyInvalid.isEmpty()) {
      throw ApiError.BadRequest("Ошибка при валидации", isBodyInvalid.array());
    }
  } catch (error) {
    throw error;
  }
};
