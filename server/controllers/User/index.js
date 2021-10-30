const { Op } = require('sequelize');
const models = require('../../database/models');
const {
  createToken,
  verifyUserToken,
  decodeToken,
} = require('../../helpers/token');
const {
  handleResponse,
  CREATED,
  OK,
} = require('../../utils/success');
const {
  createError,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
} = require('../../utils/error');

/**
 * Handles user
 *
 * @class User
 */
class User {
  /**
   * Signup user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*}
   * @memberof SetupController
   */
  static async UserSignup(req, res, next) {
    try {
      const { username, email, password } = req.body;

      // TODO: create user
      const [user, created] = await models.User.findOrCreate({
        where: {
          [Op.or]: [{ username }, { email }],
        },
        defaults: { username, email, password },
      });

      if (created) {
        // TODO: create token
        const token = createToken({ __id: user.id, username });
        return handleResponse(res, CREATED, 'Signup Successful', {
          id: user.id, username, email, token, apiKey: user.apiKey,
        });
      }
      return next(
        createError({
          status: CONFLICT,
          message: 'User with email or username already exists',
        }),
      );
    } catch (error) {
      return next(
        createError({
          status: SERVER_ERROR,
          message: `Try again something went wrong ${error}`,
        }),
      );
    }
  }

  /**
   * Login user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*}
   * @memberof SetupController
   */
  static async UserLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      // TODO: validate password and find user
      const user = await models.User.findOne({
        where: { email },
      });
      if (user) {
        const validPassword = await user.validatePassword(password);
        if (validPassword) {
          const token = createToken({ __id: user.id, username: user.username });
          return handleResponse(res, OK, 'Login Successful', {
            id: user.id,
            email: user.email,
            username: user.username,
            token,
            apiKey: user.apiKey,
          });
        }
        return next(
          createError({
            status: UNAUTHORIZED,
            message: 'Please check credentials',
          }),
        );
      }
      return next(
        createError({
          status: UNAUTHORIZED,
          message: 'Please check credentials',
        }),
      );
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

module.exports = User;
