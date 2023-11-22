const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class UnauthenticatedError extends CustomAPIError {
  statusCode: number = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
