const { Joi, joiValidate } = require('../helpers/joiValidate');

/**
 * Validations
 *
 * @class Validations
 */
class Validations {
  /**
   * User sign up validation
   *
   * @static
   * @param {*} req
   * @return {*}
   * @memberof Validations
   */
  static async validateSignup(req, res, next) {
    const payload = {
      ...req.body, ...req.query, ...req.params, ...req.headers,
    };
    const schema = Joi.object().keys({
      username: Joi.string().min(3).max(30).required()
        .messages({
          'string.pattern.base': 'username must be a string',
          'any.required': 'username is not allowed to be empty',
        }),
      email: Joi.string().email().required()
        .messages({
          'string.pattern.base': 'email must be a string and a valid email',
          'any.required': 'email is not allowed to be empty',
        }),
      password: Joi.string().min(8).required()
        .messages({
          'string.pattern.base': 'password must be a string',
          'any.required': 'password is not allowed to be empty',
        }),
    });
    await joiValidate(payload, schema);
    return next();
  }

  /**
   * User Login validation
   *
   * @static
   * @param {*} req
   * @return {*}
   * @memberof Validations
   */
  static async validateLogin(req, res, next) {
    const payload = {
      ...req.body, ...req.query, ...req.params, ...req.headers,
    };
    const schema = Joi.object().keys({
      email: Joi.string().email().required()
        .messages({
          'string.pattern.base': 'email must be a string and a valid email',
          'any.required': 'email is not allowed to be empty',
        }),
      password: Joi.string().min(8).required()
        .messages({
          'string.pattern.base': 'password must be a string',
          'any.required': 'password is not allowed to be empty',
        }),
    });
    await joiValidate(payload, schema);
    return next();
  }
}

module.exports = Validations;
