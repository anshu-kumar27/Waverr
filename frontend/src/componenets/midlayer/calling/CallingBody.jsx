import React, { useEffect, useState } from 'react'
import {
    FiPhone,
    FiVideo} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useCall } from '../../../socket/Callcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
function CallingBody({callStatus,setCallStatus,userAvatar,userId}) {
    if(!callStatus) return null;
    useEffect(()=>{
      const startCall = async() =>{
        console.log('inside useEffect of callingbody',
          {
          credentials: 'include'
        })
        try{
          const startCall = await axios.post(`/api/v1/callStart/${userId}`,{callType:callStatus},{credentials:'include'});
          console.log("call started", startCall);
        }catch(error){
          toast.error(error.err)
        }
      }
      if(userId) startCall();
    },[])
    const { incomingCall , setIncomingCall , setOnCall } = useCall();
    const[isMuted,switchMuted] = useState(true)
    const[videoOn,setVideoOn] = useState(true)
    const {user} = useSelector((state)=>state.user)
    return (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            className="relative bg-white rounded-lg w-[95%] max-w-5xl h-[80%] shadow-2xl p-4 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Call Section */}
            <div className="flex flex-1 justify-between items-center">
              {/* User 1 */}
              <div className="w-1/2 h-full flex items-center justify-center bg-gray-100 rounded-l-lg">
                {callStatus === "audio" ? (
                  <img
                    src={user?.avatar?.url}// Replace with actual user1 avatar
                    alt="User 1"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                )}
              </div>
      
              {/* Divider with Icon */}
              <div className="relative w-0.5 bg-gray-300 h-[60%] mx-2">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                  {callStatus === "audio" ? (
                    <FiPhone className="text-green-600 w-6 h-6" />
                  ) : (
                    <FiVideo className="text-blue-600 w-6 h-6" />
                  )}
                </div>
              </div>
      
              {/* User 2 */}
              <div className="w-1/2 h-full flex items-center justify-center bg-gray-100 rounded-r-lg">
                {callStatus === "audio" ? (
                  <img
                    src={userAvatar} // Replace with actual user2 avatar
                    alt="User 2"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <video
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-r-lg"
                  />
                )}
              </div>
            </div>
      
            {/* Controls */}
            <div className="flex justify-center gap-6 p-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full" onClick={() => setCallStatus(null)}>
                End Call
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full">
                {isMuted ? "Unmute" : "Mute"}
              </button>
              {callStatus !== "audio" && (
                <>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                    {videoOn ? "Hide Video" : "Show Video"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
      
}

export default CallingBody