const successResponse = (res, data = null, message = "Thành công", statusCode = 200) => {
  const response = {
    success: true,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    if (Array.isArray(data)) {
      response.count = data.length;
      response.data = data;
    } else {
      response.data = data;
    }
  }

  return res.status(statusCode).json(response);
};

const errorResponse = (res, message = "Có lỗi xảy ra", statusCode = 500, error = null) => {
  const response = {
    success: false,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (error) {
    response.error = error.message || error;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse
};