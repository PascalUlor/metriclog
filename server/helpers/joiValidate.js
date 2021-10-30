const JoisBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');

const Joi = JoisBase.extend(JoiDate);
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
 * Validate request body
 *
 * @param {object} payload
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
const joiValidate = (payload, schema) => {
  // validate request against predefined schema
//   const payload = {
//     ...req.body, ...req.query, ...req.params, ...req.headers,
//   };
  const { error, value } = schema.validate(payload, {
    allowUnknown: true,
  });

  // check for validation error
  if (error) {
    return createError({
      status: BAD_REQUEST,
      message: `Something went wrong ${error}`,
    });
  }

  return value;
};

module.exports = {
  joiValidate,
  Joi,
};
