const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userM");

exports.getUsersForSideBar = catchAsyncerrors(async(req,res,next)=>{
    const loggedInuserId = req.user.id;
    const filteredUsers = await User.find({_id: {$ne:loggedInuserId}}).select("-password");
    res.status(200).json({filteredUsers});
})