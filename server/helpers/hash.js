const bcrypt = require('bcrypt');

async function generatePasswordHash() {
  const saltRounds = 10;
  return bcrypt.hash(this.password, saltRounds);
}

async function validatePassword(password) {
  const isValid = await bcrypt.compareSync(password, this.password);
  return isValid;
}

module.exports = {
  validatePassword,
  generatePasswordHash,
};
