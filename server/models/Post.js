// guidance on creating likes on a post:
// https://stackoverflow.com/questions/45041511/how-do-i-decide-whether-a-post-is-liked-by-a-user-with-mongoose

// and
// https://stackoverflow.com/questions/28006521/how-to-model-a-likes-voting-system-with-mongodb

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  rentMonthly: {
    type: Number,
    required: true,
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  totalMoveInCost: {
    type: Number,
    required: true,
  },
  otherFeesMonthly: {
    type: Number,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now(),
  },
  housingType: {
    type: String,
    required: true,
  },
  roomPrivacy: {
    type: String,
    required: true,
  },
  moveInDate: {
    type: Date,
    required: true,
  },
  numberOfCohabitants: {
    type: Number,
    required: true,
  },
  hasPrivateBath: {
    type: Boolean,
    required: true,
  },
  hasFurnishedRoom: {
    type: Boolean,
    required: true,
  },
  hasParkingIncluded: {
    type: Boolean,
    required: true,
  },
  hasWasherDryerInUnit: {
    type: Boolean,
    required: true,
  },
  hasPetsAllowed: {
    type: Boolean,
    required: true,
  },
  hasWifi: {
    type: Boolean,
    required: true,
  },
  hasCableTelevision: {
    type: Boolean,
    required: true,
  },
  hasKitchenAccess: {
    type: Boolean,
    required: true,
  },
  hasPoolAccess: {
    type: Boolean,
    required: true,
  },
  hasDrugTolerantCohabitants: {
    type: Boolean,
    required: true,
  },
  featureImage: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
});

module.exports = mongoose.model('Post', PostSchema);
