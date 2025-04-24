const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userM");

exports.getUsersForSideBar = catchAsyncerrors(async(req,res,next)=>{
    const loggedInuserId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInuserId } })
  .select("-password")
  .sort({ "userLastMessage.createdAt": -1 });
      
    // console.log("these are filtered : ",filteredUsers)
    res.status(200).json({filteredUsers});
})