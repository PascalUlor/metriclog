const { Router } = require('express');
const Authentication = require('../middleware/Authentication');
const Validations = require('../middleware/Validations');
const User = require('../controllers/User');

const router = Router();

router
  .route('/signup')
  .post(Validations.validateSignup, User.UserSignup);

router
  .route('/login')
  .post(Validations.validateLogin, User.UserLogin);

module.exports = router;
