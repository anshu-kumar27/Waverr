const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const CallHistory = require('../models/callM')
const User = require('../models/userM')
const { getReceiverSocketId, io } = require("../app") ;
const moment = require('moment');
const ErrorHandler = require("../utils/errorHandler");
/*
const callSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      ],
      startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      type: { type: String, enum: ['audio', 'video'], required: true },
      callDuration:{type:Number},
      startedAt: { type: Date, default: Date.now },
      endedAt: { type: Date, default: Date.now },
      duration: Number, // in seconds
      status: {
        type: String,
        enum: ['missed', 'ended', 'rejected'],
        default: 'ended'
      },
},{timestamps:true})
*/


exports.startCall= catchAsyncerrors(async(req,res,next)=>{
    const {callType} = req.body;
    if(!['audio','video'].includes(callType)) return next(new ErrorHandler('invalid call type',400))
    const date = Date.now();
    const userId = req.user.id;
    const {id: receiverId} = req.params;
    const callData = {
        startedAt: date,
        startedBy: userId,
        type: callType,
        participants: [userId, receiverId],
    };
    console.log("call started from ",userId," to : ",receiverId);
    const call = await CallHistory.create(callData)
    const user = await User.findById(userId).select('-password');


    // const userM = update the last message to call status;\\ 
    const socketId  = getReceiverSocketId(receiverId);
    if(socketId && io){
        io.to(socketId).emit("incomingCall",{
            callFrom: userId,
            callerDetails: user,
            startedAt: date,
            callDetails:call,
            receiverId:receiverId
        })
    }
    else{
        await CallHistory.findByIdAndUpdate(call._id, {
            status: "missed",
            endedAt: Date.now()
        });    
    }
    res.status(200).json({success:true,message:"user,call send via socket",user,call})
})

//handling rejected case
exports.callReject = catchAsyncerrors(async(req,res,next)=>{
    const {data} = req.body;
    const currentTime = Date.now();
    const durationMs = currentTime - new Date(data.startedAt); // duration in milliseconds
    const duration = moment.utc(durationMs).format("mm:ss");

    const updatedCall = await CallHistory.findByIdAndUpdate(
        data.callId,
        {
            duration: duration,
            endedAt: currentTime,
            status: 'rejected'
        },
        { new: true }
    );
    const socketId  = getReceiverSocketId(data.callFrom);
    if(socketId && io)
    io.to(socketId).emit("callRejected",{status:"rejected"})
    res.status(200).json({success:true,message:'call rejected',updatedCall})
})

exports.callAccept = catchAsyncerrors(async(req,res,next)=>{
    const {data} = req.body;
    const socketId  = getReceiverSocketId(data.callFrom);
    if(socketId && io)
    io.to(socketId).emit("callAccepted",{data})
    res.status(200).json({success:true,message:'call rejected',updatedCall})
})