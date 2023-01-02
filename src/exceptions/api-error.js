class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Вы не авторизованы");
  }

  static BadRequest(message = "Хуевый запрос получается", errors) {
    return new ApiError(400, message, errors);
  }

  static InvalidRequest(message = "Request", errors) {
    return new ApiError(400, message + " is invalid", errors);
  }

  static NotExist(message = "This shit is doesn't exist", errors) {
    return new ApiError(404, message, errors);
  }

  static AlreadyExist(message = "This shit is exists", errors) {
    return new ApiError(403, message, errors);
  }
}

export { ApiError };
