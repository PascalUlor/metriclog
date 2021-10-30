require('dotenv').config();
const models = require('../database/models');

/**
 * verify api key
 *
 * @param {*} token
 * @returns user with specified apiKey
 */
const verifyApiKey = async (apiKey) => {
  try {
    if (!apiKey) return null;
    const user = await models.User.findOne({ where: { apiKey } });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  verifyApiKey,
};
