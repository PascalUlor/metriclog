const { Joi, joiValidate } = require('../helpers/joiValidate');
const {
  verifyToken,
} = require('../helpers/token');
const { verifyApiKey } = require('../helpers/verifyKey');
const {
  createError,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
} = require('../utils/error');

/**
 * Validations
 *
 * @class Validations
 */
class Authentication {
  /**
   * Authentication
   *
   * @static
   * @param {*}
   * @return {*}
   * @memberof Authentication
   */
  static async AuthenticateUser(req, res, next) {
    try {
      const payload = {
        ...req.body, ...req.query, ...req.params, ...req.headers,
      };

      if (!payload.token && !payload.apiKey) {
        return next(
          createError({
            status: UNAUTHORIZED,
            message: 'Unauthorized',
          }),
        );
      }
      // TODO verify token
      if (payload.token) {
        const user = await verifyToken(payload.token);
        req.user = user;
      }

      // TODO verify apiKey
      if (payload.apiKey) {
        const user = await verifyApiKey(payload.apiKey);
        req.user = user;
      }
      return next();
    } catch (error) {
      return next(
        createError({
          status: SERVER_ERROR,
          message: `Try again something went wrong ${error}`,
        }),
      );
    }
  }
}

module.exports = Authentication;
