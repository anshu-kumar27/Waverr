import { useEffect, useState } from 'react'
import './App.css'
import MainAuth from './componenets/auth/MainAuth';
import {BrowserRouter as Router , Routes , Route, useNavigate, useLocation} from 'react-router-dom'
import Home from './componenets/home/Home';
import Errorpg from './componenets/error/Errorpg';
import { loadUser } from './action/userAction';
import { useDispatch, useSelector } from 'react-redux';
// import Globe from './componenets/midlayer/Globe';
import { useSocketContext } from './socket/socket';
import IncomingVoiceCall from './componenets/midlayer/calling/IncomingVoiceCall';
import { useCall } from './socket/Callcontext';
import CallingBody from './componenets/midlayer/calling/CallingBody';
import Settings from './componenets/home/Settings';
import Globe from './componenets/midlayer/Globe';
import Message from './componenets/midlayer/Message';
import MainLayout from './MainLayout';
import Group from './componenets/midlayer/Group';
import Call from './componenets/midlayer/Call';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {socket} = useSocketContext();
  const {setIncomingCall,incomingCall,onCall} = useCall()
  const { isAuthenticated } = useSelector((state) => state.user)
  const[pendingSignal, setPendingSignal] = useState(null);
  const location = useLocation();
  const isLocated = location.pathname.includes('/auth')
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
            <Route path='/' element={<MainLayout><Home /></MainLayout>}/>
            <Route path='/message' element={<MainLayout><Message /></MainLayout>}/>
            <Route path='/call' element={<MainLayout><Call /></MainLayout>}/>
            <Route path='/group' element={<MainLayout><Group /></MainLayout>}/>
            {/* <Route path='/globe' element={<Globe />}/> */}

            <Route path='*' element={<Errorpg />}/>


            </Routes>
            </div>
        </>
  )
}

export default App
