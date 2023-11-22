import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthorizedError extends CustomAPIError {
  statusCode: number = StatusCodes.FORBIDDEN;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
