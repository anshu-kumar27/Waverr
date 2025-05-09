const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userM");
const Profile = require("../models/profileM");
const { getReceiverSocketId, io } = require("../app");
const ErrorHandler = require("../utils/errorHandler");

//  message section PVT

// this is for temp testing
exports.getUsersForSideBar = catchAsyncerrors(async(req,res,next)=>{
    const loggedInuserId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInuserId } })
  .select("-password")
  .sort({ "userLastMessage.createdAt": -1 });
      
    // console.log("these are filtered : ",filteredUsers)
    res.status(200).json({filteredUsers});
})


exports.findFriends = catchAsyncerrors(async(req,res,next)=>{
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({user:loggedInuserId});
  const friends = profile?.friends ?? [];
  res.status(200).json({friends})
})


exports.searchForFriends = catchAsyncerrors(async(req,res,next)=>{
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
        'profileName':1,
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
exports.findStatusUsers = catchAsyncerrors(async(req,res,next)=>{
  const userId = req.user.id;
  const result = await Profile.findOne({ user: userId })
  .populate({
    path: 'friends',
    select: '-password', // hide password from each populated user
  });

    res.status(200).json({result})
})


//  Home
exports.getUsersForHomeSideBar = catchAsyncerrors(async(req,res,next)=>{
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({user : loggedInuserId});
  let friends = profile?.friends ?? [];
  friends.push(loggedInuserId);
  const filteredUsers = await User.find({_id: {$nin : friends}}).select("-password");

  res.status(200).json({filteredUsers});
})

//  notifications / home updates 

exports.sendFriendReq = catchAsyncerrors(async(req,res,next)=>{
  const loggedInuserId = req.user.id;
  const {id: targetUserId} = req.params;
  
  const targetProfile = await Profile.findOne({ user: targetUserId });

  if (!targetProfile) return next(new ErrorHandler("profile not found", 404));
  
  // checking if friend already exists
  if (targetProfile.friends.includes(loggedInuserId)) {
    return next(new ErrorHandler("Friend already exists", 400));
  }
  
  // checking if there is any friend request already in the queue
  const existingRequest = targetProfile.friendReqStatus.find(
    (req) => req.user.toString() === loggedInuserId.toString() &&
            (req.status === "pending" || req.status === "accepted")
  );
  
  if (existingRequest) {
    return next(new ErrorHandler("Friend request already exists or was accepted", 400));
  }
  

  // Add new friend request
  const updatedProfile = await Profile.findOneAndUpdate(
    { user: targetUserId },
    {
      $addToSet: {
        friendReqStatus: {
          user: loggedInuserId,
          status: "pending"
        }
      }
    },
    { new: true }
  );

  const newRequest = updatedProfile.friendReqStatus.find(
    (req) => req.user.toString() === loggedInuserId.toString()
  );

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId && io) {
    io.to(receiverSocketId).emit("newReq", newRequest);
  }

  res.status(200).json({newRequest})

})


exports.updateStatusOfFriend = catchAsyncerrors(async(req,res,next)=>{
  const loggedInuserId = req.user.id;
  const profile = await Profile.findOne({user:loggedInuserId});
})