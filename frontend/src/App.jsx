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
import Message from './componenets/midlayer/Message';
import MainLayout from './MainLayout';
import Group from './componenets/midlayer/Group';
import Call from './componenets/midlayer/Call';
import ShowProfile from './componenets/home/profile/ShowProfile';
import UploadImage from './componenets/home/profile/UploadImage';
import Loading from './loading/Loading';
import { UseNotification } from './socket/Notification';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {socket} = useSocketContext();
  const {setIncomingCall,incomingCall,onCall} = useCall()
  const {isAuthenticated } = useSelector((state) => state.user)
  const[pendingSignal, setPendingSignal] = useState(null);
  const [loading,setLoading] = useState(false);
  const {setNotification} = UseNotification()
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        await dispatch(loadUser());
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
  
    fetchUser();
  }, [dispatch]);
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated]);
  
  
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
      
      const handleNewReq = (data) => {
        console.log('got a new notification',data);
        setNotification(Date.now());
      }
      const handleRemoveReq = (data) => {
        console.log('removed a notification',data);
        setNotification(Date.now());
      }
          socket.on('receiveSignal', handleReceiveSignal);
          socket.on('removeReq', handleRemoveReq)
          socket.on('newReq', handleNewReq)
    
    return () =>{
      socket.off('incomingCall')
      socket.off('receiveSignal');
      socket.off('removeReq')
      socket.off('newReq')
    }
  },[socket])
  return (
        <>
        {loading ? <div className='h-[100vh] flex-1'> <Loading/> </div>: (<div className="flex">
        {incomingCall && !onCall && <IncomingVoiceCall pendingSignal={pendingSignal} setPendingSignal={setPendingSignal}/>}
        {incomingCall && onCall && <CallingBody/>}
            <Routes>
            <Route path='/auth' element={<MainAuth />}/>
            <Route path='/' element={<MainLayout><Home /></MainLayout>}/>
            <Route path='/message' element={<MainLayout><Message /></MainLayout>}/>
            <Route path='/call' element={<MainLayout><Call /></MainLayout>}/>
            <Route path='/group' element={<MainLayout><Group /></MainLayout>}/>
            <Route path='/me' element={<MainLayout><ShowProfile /></MainLayout>}/>
            <Route path='/me/post' element={<MainLayout><UploadImage /></MainLayout>}/>
            {/* <Route path='/globe' element={<Globe />}/> */}

            <Route path='*' element={<Errorpg />}/>


            </Routes>
            </div>)}
        
        </>
  )
}

export default App
