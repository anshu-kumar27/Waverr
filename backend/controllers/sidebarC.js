const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userM");
const Profile = require("../models/profileM");
const { getReceiverSocketId, io } = require("../app");
const ErrorHandler = require("../utils/errorHandler");
const Notification = require('../models/notification')
//  message section PVT

// this is for temp testing
exports.getUsersForSideBar = catchAsyncerrors(async (req, res, next) => {
  const loggedInuserId = req.user.id;
  const filteredUsers = await User.find({ _id: { $ne: loggedInuserId } })
    .select("-password")
    .sort({ "userLastMessage.createdAt": -1 });

  // console.log("these are filtered : ",filteredUsers)
  res.status(200).json({ filteredUsers });
})

//  this is to find all the friends
exports.findFriends = catchAsyncerrors(async (req, res, next) => {
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({ user: loggedInuserId });
  const friends = profile?.friends ?? [];
  res.status(200).json({ friends })
})

//  this is to search for the freinds includes aggregation pipeline
exports.searchForFriends = catchAsyncerrors(async (req, res, next) => {
  const { search } = req.body;
  if (!search || search.trim() === "") {
    return next(new ErrorHandler("Search term is required", 400));
  }

  const regex = new RegExp(search, 'i');

  const results = await Profile.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'friends',
        foreignField: '_id',
        as: 'userData'
      }
    },
    { $unwind: '$userData' },

    // Create a custom score for relevance
    {
      $addFields: {
        matchScore: {
          $cond: [
            { $regexMatch: { input: '$userData.firstName', regex: new RegExp(`^${search}`, 'i') } }, 3,
            {
              $cond: [
                { $regexMatch: { input: '$userData.lastName', regex: new RegExp(`^${search}`, 'i') } }, 2,
                {
                  $cond: [
                    { $regexMatch: { input: '$profileName', regex: new RegExp(`^${search}`, 'i') } }, 1,
                    0
                  ]
                }
              ]
            }
          ]
        }
      }
    },

    {
      $match: {
        $or: [
          { 'profileName': { $regex: regex } },
          { 'userData.firstName': { $regex: regex } },
          { 'userData.lastName': { $regex: regex } }
        ]
      }
    },

    {
      $project: {
        'userData.firstName': 1,
        'userData.avatar': 1,
        'profileName': 1,
        matchScore: 1
      }
    },

    {
      $sort: { matchScore: -1 }
    }
  ]).allowDiskUse(true);


  res.status(200).json({ results });


})



// find the user for status 
exports.findStatusUsers = catchAsyncerrors(async (req, res, next) => {
  const userId = req.user.id;
  const result = await Profile.findOne({ user: userId })
    .populate({
      path: 'friends',
      select: '-password', // hide password from each populated user
    });

  res.status(200).json({ result })
})


//  Home
exports.getUsersForHomeSideBar = catchAsyncerrors(async (req, res, next) => {
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({ user: loggedInuserId });
  let friends = profile?.friends ?? [];
  friends.push(loggedInuserId);
  const filteredUsers = await User.find({ _id: { $nin: friends } }).select("-password");

  res.status(200).json({ filteredUsers,profile });
})

//  notifications / home updates 
exports.sendFriendReq = catchAsyncerrors(async (req, res, next) => {
  const loggedInuserId = req.user.id;
  const { id: targetUserId } = req.params;

  const user = await User.findById(targetUserId);
  if (!user) return next(new ErrorHandler("target user not found", 404));

  const senderProfile = await Profile.findOne({ user: loggedInuserId });
  if (!senderProfile) return next(new ErrorHandler("something went wrong", 404));

  if (senderProfile.friends.includes(targetUserId)) {
    return next(new ErrorHandler("Friend already exists", 400));
  }

  const existingRequest = senderProfile.friendReqStatus.find(
    (req) =>
      req.user.toString() === targetUserId.toString() &&
      (req.status === "pending" || req.status === "accepted")
  );
  if (existingRequest) {
    return next(new ErrorHandler("Friend request already exists or was accepted", 400));
  }

  // Add request to target user’s profile
  const updatedProfile = await Profile.findOneAndUpdate(
    { user: loggedInuserId },
    {
      $addToSet: {
        friendReqStatus: {
          user: targetUserId,
          status: "pending",
        },
      },
    },
    { new: true }
  );

  if (!updatedProfile) return next(new ErrorHandler("Target profile not found", 404));

  // Create and populate the notification
  const notification = await Notification.create({
    user: targetUserId,
    sender: loggedInuserId,
    type: "friendRequest",
    status: "active",
  });

  const populatedNotification = await Notification.findById(notification._id)
    .populate({ path: "sender", select: "-password" }).sort({ _id: -1 });

  // Emit socket event
  const receiverSocketId = getReceiverSocketId(targetUserId);
  if (receiverSocketId && io) {
    io.to(receiverSocketId).emit("newReq", populatedNotification);
  }

  res.status(200).json({ notification: populatedNotification });
});

exports.removeFriendReq = catchAsyncerrors(async (req, res, next) => {
  const userId = req.user.id;
  const { id: targetUserId } = req.params;
  const updatedProfile = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        friendReqStatus: {
          user: targetUserId
        }
      }
    },
    { new: true }
  );

  if (!updatedProfile) {
    return next(new ErrorHandler("Friend request not found", 404));
  }
  await Notification.findOneAndDelete(
    {
      user: targetUserId,
      sender: userId,
      type: "friendRequest",
      status: "active"
    },
  );

  const receiverSocketId = getReceiverSocketId(targetUserId);
  if (receiverSocketId && io) {
    io.to(receiverSocketId).emit("removeReq", "restart");
  }
  res.status(200).json({ status: "sucess" })
})



exports.updateStatusOfFriend = catchAsyncerrors(async (req, res, next) => {
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({ user: loggedInuserId });
})






// notification bar
exports.fetchNotifications = catchAsyncerrors(async(req,res,next)=>{
  const userId = req.user.id;
  const fetchNotifications = await Notification.find({user:userId , status : 'active'}).sort({_id:-1})
  const result = fetchNotifications.length === 0 ? [] : fetchNotifications;
  res.status(200).json(result)
})