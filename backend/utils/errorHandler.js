const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
