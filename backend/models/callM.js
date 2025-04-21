import mongoose from 'mongoose'

const callSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      ],
      startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
      type: { type: String, enum: ['audio', 'video'], required: true },
      startedAt: { type: Date, default: Date.now },
      endedAt: Date,
      duration: Number, // in seconds
      status: {
        type: String,
        enum: ['missed', 'ended', 'rejected'],
        default: 'ended'
      }
},{timestamps:true})

module.exports = mongoose.model('CallHistory',callSchema);