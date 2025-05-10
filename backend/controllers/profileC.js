const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userM");
const Profile = require("../models/profileM");
const cloudinary = require("../config/cloudinary");
const Post = require('../models/postModel');
const ErrorHandler = require("../utils/errorHandler");

exports.updateProfile = catchAsyncerrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne({ user: req.user.id });
    let obj = { user, profile };

    res.status(200).json({ success: true, details: obj })
})

exports.handleProfileUpdate = catchAsyncerrors(async (req, res, next) => {
    const { firstName, lastName, bio, gender, avatar } = req.body;
    console.log(req.body)
    // Start with an object to build the update
    let updateData = {
        firstName: firstName,
        lastName: lastName
    };

    if (avatar && avatar.startsWith('data:image')) {
        try{
        const uploadedResponse = await cloudinary.uploader.upload(avatar, {
          folder: 'avatars',
          resource_type: 'image'
        });
        updateData.avatar = {
            public_id: uploadedResponse.public_id, // Store the Cloudinary public_id
            url: uploadedResponse.secure_url // Store the Cloudinary URL
          }; 
        }catch(err){
            console.log(err);
        }     
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    // Prepare the Profile update object
    let profileUpdateData = {};
    if (bio) profileUpdateData.bio = bio;
    if (gender) profileUpdateData.gender = gender;
    const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        profileUpdateData,
        { new: true, upsert: true } // upsert: true will create the profile if it doesn't exist
    );
    res.status(200).json({ user, profile })
})





exports.selectedProfile = catchAsyncerrors(async (req, res, next) => {
    const viewerId = req.user.id;
    const { id: targetId } = req.params;

    // Fetch current user's profile (to check friends)
    const viewerProfile = await Profile.findOne({ user: viewerId });

    // Fetch target profile minimally to check visibility
    const targetProfileBasic = await Profile.findOne({ user: targetId })
        .select('profileVisibility friends user');

    if (!targetProfileBasic) return next(new ErrorHandler('Profile not found', 404));

    const isUser = viewerId.toString() === targetId.toString();
    const isFriend = targetProfileBasic.friends.some(friend => friend.toString() === viewerId.toString());
    const isPublic = targetProfileBasic.profileVisibility === 'public';

    if (!isPublic && !isFriend && !isUser) {
        return next(new ErrorHandler('Not authorized to view this profile', 403));
    }

    // Now fetch full target profile with posts only if authorized
    const targetProfile = await Profile.findOne({ user: targetId })
        .populate({
            path: 'user',
            select: 'avatar firstName',
        })
        .populate({
            path: 'post',
            populate: {
                path: 'user',
                select: 'firstName avatar'
            }
        });

    // Annotate each post with "isLiked" by current user
    const postsWithLikes = targetProfile.post.map(post => {
        const isLiked = post.likes.some(likeId => likeId.toString() === viewerId.toString());
        return {
            ...post.toObject(),
            isLiked
        };
    });

    res.status(200).json({
        profile: {
            ...targetProfile.toObject(),
            post: postsWithLikes
        }
    });
});
