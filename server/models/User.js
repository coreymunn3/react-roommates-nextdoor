const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
      default: 'defaults/default_v8eyea',
    },
    url: {
      type: String,
      default:
        'https://res.cloudinary.com/dcmstbvwq/image/upload/v1618241546/defaults/default_v8eyea.jpg',
    },
  },
  _location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
