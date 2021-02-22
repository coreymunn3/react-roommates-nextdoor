const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  _location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
});

module.exports = mongoose.model('User', UserSchema);
