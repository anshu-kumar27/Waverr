import React, { useEffect, useState } from 'react'
import {
    FiPhone,
    FiVideo} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useCall } from '../../../socket/Callcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSocketContext } from '../../../socket/socket';
import { zustandStore } from '../../../zustand/zustand';
function CallingBody() {
    
    const {socket} = useSocketContext();
    const { incomingCall, setIncomingCall, setOnCall, callType ,setCallType} = useCall();
    if(!callType && !incomingCall?.callDetails?.type) {return null;}
    useEffect(()=>{
      if(!callType){
        setCallType(incomingCall?.callDetails?.type);
      }
    },[])
    const [callEnded,setCallEnded] = useState(false)
    const selectedConversation = zustandStore(state => state.selectedConversation);
    const [callData,setCallData] = useState();
    const [isPicked,setIsPicked] = useState(false);
    useEffect(() => {
      if (!socket) return;
    
      const onCallRejected = (socketData) => {
        setIncomingCall(null);
        setOnCall(false);
        setCallType(null);
        toast.warn('User rejected your call');
      };
    
      const onCallAccepted = (socketData) => {
        setIsPicked(true);
      };
    
      const onCallEnded = (endData) => {
        setIncomingCall(null);
        setOnCall(false);
        setCallType(null);
      }
    
      socket.on('callRejected', onCallRejected);
      socket.on('callAccepted', onCallAccepted);
      socket.on('callEnd', onCallEnded);
    
      return () => {
        socket.off('callRejected', onCallRejected);
        socket.off('callAccepted', onCallAccepted);
        socket.off('callEnd', onCallEnded);
      };
    }, [socket]);
    
    useEffect(()=>{
      const startCall = async() =>{
        console.log('inside useEffect of callingbody',
          {
          credentials: 'include'
        })
        try{
          const startCall = await axios.post(`/api/v1/callStart/${selectedConversation}`,{callType:callType},{credentials:'include'});
          console.log("call started", startCall.data);
          setCallData(startCall.data);
        }catch(error){
          toast.error(error.err)
        }
      }
      if(selectedConversation) startCall();
    },[selectedConversation])
    const[isMuted,switchMuted] = useState(true)
    const[videoOn,setVideoOn] = useState(true)
    // const {user} = useSelector((state)=>state.user)

    const handleCallEnd = async() =>{
      setCallType(null)
      setCallEnded(true);
      setIncomingCall(null);
      setOnCall(false);
      try{
        const res = await axios.put('/api/v1/callEnd',{incomingCall},{credentials:'required'});
        console.log("success while handling callend")
      }catch(error){
        console.log("error while ending the call")
      }
    }
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
                {callType === "audio" ? (
                  <img
                    src={callData?.callerDetails?.avatar?.url || incomingCall?.callerDetails?.avatar?.url}// Replace with actual user1 avatar
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
                  {callType === "audio" ? (
                    <FiPhone className="text-green-600 w-6 h-6" />
                  ) : (
                    <FiVideo className="text-blue-600 w-6 h-6" />
                  )}
                </div>
              </div>
      
              {/* User 2 */}
              {isPicked || incomingCall ? (<div className="w-1/2 h-full flex items-center justify-center bg-gray-100 rounded-r-lg">
                {callType === "audio" ? (
                  <img
                    src={callData?.receiverDetails?.avatar?.url || incomingCall?.receiverDetails?.avatar?.url} // Replace with actual user2 avatar
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
              </div>) : (<h1>loading...</h1>)}
              
            </div>
      
            {/* Controls */}
            <div className="flex justify-center gap-6 p-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full" onClick={()=> handleCallEnd()}>
                End Call
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full">
                {isMuted ? "Unmute" : "Mute"}
              </button>
              {callType !== "audio" && (
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