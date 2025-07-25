class CustomErrorHandler extends Error {
  constructor(message, statusCode = 500, error = null) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default CustomErrorHandler;
