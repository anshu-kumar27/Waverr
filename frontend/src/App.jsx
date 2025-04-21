import { useEffect, useState } from 'react'
import './App.css'
import MainAuth from './componenets/auth/MainAuth';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './componenets/home/Home';
import Errorpg from './componenets/error/Errorpg';
import { loadUser } from './action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import store from './store';
import Messages from './componenets/home/sidebar/Messages';
import Groups from './componenets/home/sidebar/Groups';
import Communities from './componenets/home/sidebar/Communities';
import CallHistory from './componenets/home/sidebar/CallHistory';
import Settings from './componenets/home/Settings';
import Index from './componenets/home/sidebar/Index';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated ,user } = useSelector((state) => state.user)
  useEffect(() => {
    console.log("User:", user); // check if null after logout
    if (user) dispatch(loadUser());
  }, [user]);
  
  return (
        <>
        <div className="flex">
        <Router>
       <Settings />
            <Routes>
            
            <Route path="/messages" element={<Index />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/calls" element={<CallHistory />} />
            <Route path='/auth' element={<MainAuth />}/>

            <Route path='*' element={<Errorpg />}/>


            </Routes>
            </Router>
            </div>
        </>
  )
}

export default App
