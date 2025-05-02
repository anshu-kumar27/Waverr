import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import React from 'react'

function UserPosts({ user }) {
    const posts = [
        {
            user: "https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg",
            userName: "meow meow",
            post: "https://media.istockphoto.com/id/483367738/photo/homemade-meat-loves-pizza.jpg?s=612x612&w=0&k=20&c=NCrwrMA8vuUR5ABRZKTtIaOvAC96RAPjnxXi5fFG8RQ=",
            totalLikes: 10
        },
        {
            user: "https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg",
            userName: "meow meow",
            post: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6gjBnddiV_XiPjbh56C68ZFzrfpNAhmmwQ&s",
            totalLikes: 15
        },
        {
            user: "https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg",
            userName: "meow meow",
            post: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6gjBnddiV_XiPjbh56C68ZFzrfpNAhmmwQ&s",
            totalLikes: 15
        },
        {
            user: "https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg",
            userName: "meow meow",
            post: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6gjBnddiV_XiPjbh56C68ZFzrfpNAhmmwQ&s",
            totalLikes: 15
        },
    ];

    return (
        <>
            <div className="relative my-10">
                <div className="border-t border-gray-300 w-full"></div>
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 
    text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                    Posts
                </h1>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                {posts.map((item, index) => (
                    <div key={index} className="bg-white border rounded-lg shadow-sm">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between px-4 py-2">
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        user?.avatar?.url ??
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-wuYiRWzSyANZx8ccFY4sQvXkI_ve46_sAw&s"
                                    }
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-sm">{item.userName}</p>
                                    <p className="text-xs text-gray-500">Somewhere</p>
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-black">⋯</button>
                        </div>

                        {/* Post Image */}
                        <div className="w-full aspect-[3/2] overflow-hidden">
                            <img
                                src={item.post}
                                alt="post"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className="flex gap-4">
                                <Heart className="cursor-pointer" />
                                <MessageCircle className="cursor-pointer" />
                                <Send className="cursor-pointer" />
                            </div>
                            <Bookmark className="cursor-pointer" />
                        </div>

                        {/* Likes */}
                        <div className="px-4 pb-3 text-sm font-medium">
                            {item.totalLikes} likes
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserPosts;
