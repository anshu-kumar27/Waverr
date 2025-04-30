import { useEffect, useState } from 'react'
import './App.css'
import MainAuth from './componenets/auth/MainAuth';
import {BrowserRouter as Router , Routes , Route, useNavigate} from 'react-router-dom'
import Home from './componenets/home/Home';
import Errorpg from './componenets/error/Errorpg';
import { loadUser } from './action/userAction';
import { useDispatch, useSelector } from 'react-redux';
// import Globe from './componenets/midlayer/Globe';
import { useSocketContext } from './socket/socket';
import IncomingVoiceCall from './componenets/midlayer/calling/IncomingVoiceCall';
import { useCall } from './socket/Callcontext';
import CallingBody from './componenets/midlayer/calling/CallingBody';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {socket} = useSocketContext();
  const {setIncomingCall,incomingCall,onCall} = useCall()
  const { isAuthenticated ,user } = useSelector((state) => state.user)
  const[pendingSignal, setPendingSignal] = useState(null);
  // const[pendingCallType, setPendingCallType ] = useState(null);
  useEffect(() => {
    dispatch(loadUser());
    if(!isAuthenticated) navigate('/auth')
  }, [dispatch]);
  
  useEffect(()=>{
    if(!socket) return;
    socket.on('incomingCall',(callData)=>{
      setIncomingCall(callData)
    })
    const handleReceiveSignal = ({ signal, callType }) => {
        console.log('Received offer from caller but waiting for user to accept...',signal);
          setPendingSignal(signal);
          console.log("pending signal is : ",pendingSignal," or rather ",signal)
      };
      
          socket.on('receiveSignal', handleReceiveSignal);
    
    return () =>{
      socket.off('incomingCall')
      socket.on('receiveSignal', handleReceiveSignal);
    }
  },[socket])
  return (
        <>
        <div className="flex">
        {incomingCall && !onCall && <IncomingVoiceCall pendingSignal={pendingSignal} setPendingSignal={setPendingSignal}/>}
        {incomingCall && onCall && <CallingBody/>}
        
            <Routes>
            <Route path='/auth' element={<MainAuth />}/>
            <Route path='/' element={<Home />}/>
            {/* <Route path='/globe' element={<Globe />}/> */}

            <Route path='*' element={<Errorpg />}/>


            </Routes>
            </div>
        </>
  )
}

export default App
