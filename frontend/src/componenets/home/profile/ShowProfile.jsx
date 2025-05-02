import React from 'react'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import UserPosts from './UserPosts'
import { Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ShowProfile() {
  const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
  return (
    <div className="p-4 md:p-8 md:mt-5 mt-10 md:h-[92vh] h-[87vh] overflow-y-scroll">
           {/* Cover Header */}
           <div className="bg-slate-200 md:h-[8rem] h-[5rem] w-full rounded-lg" />

{/* Avatar, Name, Bio, Edit Section */}
<div className="flex flex-col md:flex-row items-center md:items-start gap-4 relative -mt-12 md:-mt-20">
  {/* Avatar */}
  <div className="shrink-0">
    <img
      src={
        user?.avatar?.url ??
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-wuYiRWzSyANZx8ccFY4sQvXkI_ve46_sAw&s"
      }
      alt="avatar"
      className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-20 md:w-28 aspect-square object-cover"
    />
  </div>

  {/* Name + Bio */}
  <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left">
    <h2 className="text-2xl font-semibold">
      {user.firstName + " " + user.lastName}
    </h2>
    <p className="text-gray-500 mt-1">
      {user.bio ?? "This user hasn't written a bio yet."}
    </p>
  </div>

  {/* Edit Button */}
  <div className="flex flex-row md:block md:mt-6 mt-4 gap-4 pr-5 pb-5">
{/* Responsive Posts + Edit Button Layout */}

  {/* Mobile-only edit button (hidden on md and up) */}
    <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
      <FaPen />
      Edit profile
    </button>
    <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline md:mt-2" onClick={()=>navigate('/me/post')}>
      <Upload size={20}/>
      Post
    </button>
  </div>
  </div>
  {/* Posts Section */}
  <UserPosts user={user} />

</div>
  )
}

export default ShowProfile
