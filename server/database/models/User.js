const rand = require('crypto').randomBytes;
const bcrypt = require('bcrypt');
const {
  Model,
} = require('sequelize');
const {
  validatePassword,
  generatePasswordHash,
} = require('../../helpers/hash');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Invalid Email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password is required',
        },
      },
    },
    apiKey: {
      type: DataTypes.STRING(20),
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    // TODO has password
    user.password = await user.generatePasswordHash();
    // TODO create apiKey
    user.apiKey = `api_key_${rand(12).toString('hex')}`;
  });
  User.prototype.generatePasswordHash = generatePasswordHash;
  User.prototype.validatePassword = validatePassword;
  return User;
};
