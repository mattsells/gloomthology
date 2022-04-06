enum HttpStatus {
  Success = 200,
  Created = 202,
  NoContent = 204,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  ServerError = 500,
}

export default HttpStatus;
