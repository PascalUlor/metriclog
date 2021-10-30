/**
 * Define success status constants
 */
const CREATED = 201;
const OK = 200;

/**
 *Create success response data format
 *
 * @param {object} res
 * @param {object} statusCode
 * @param {object} body
 * @param {string} [message='successful']
 * @return {object}
 */
const handleResponse = (res, statusCode, message = 'successful', body) => {
  if (!body) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    body,
  });
};

module.exports = {
  handleResponse,
  CREATED,
  OK,
};
