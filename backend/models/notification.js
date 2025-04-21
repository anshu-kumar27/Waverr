import mongoose from 'mongoose'
const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['message', 'call', 'invite'] },
    data: mongoose.Schema.Types.Mixed, // you can store messageId, conversationId, etc.
    isSeen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  