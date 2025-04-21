const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One-to-one mapping with User
  },
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  blockedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  pictures: [
    {
      url: { type: String, required: false },
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  avatars: [
    {
      url: { type: String, required: false },
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  bio: {
    type: String,
    maxLength: 160,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  profileVisibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
