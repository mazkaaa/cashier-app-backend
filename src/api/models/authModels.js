const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line func-names
AuthSchema.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, 10);
  next();
});

module.exports = mongoose.model('Auths', AuthSchema);
