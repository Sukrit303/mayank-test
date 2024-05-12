// Error Handler Class (inheritance = Error is parents class for ErrorHandler)
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // Super is constructor of parents class
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = ErrorHandler;

