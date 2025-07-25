function Response(req, res, next) {
  const statusCode = res.statusCode || 200;
  const response = {
    status: statusCode,
    success: true,
    message: res.locals.message || "",
    result: res.locals.data || [],
  };
  res.status(statusCode).json(response);
}

export default Response;
