/**
 * Custom error class for API errors
 * @extends Error
 */

class ApiError extends Error {
    /**
      * Create a new ApiError
      * @param {number} statusCode - The HTTP status code of the error
      * @param {string} message - The error message
      */
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;