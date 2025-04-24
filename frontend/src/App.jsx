import { useEffect, useState } from 'react'
import './App.css'
import MainAuth from './componenets/auth/MainAuth';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './componenets/home/Home';
import Errorpg from './componenets/error/Errorpg';
import { loadUser } from './action/userAction';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated ,user } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(loadUser());
    console.log("User:", user); // check if null after logout
  }, [dispatch]);
  
  return (
        <>
        <div className="flex">
        <Router>
            <Routes>
            <Route path='/auth' element={<MainAuth />}/>
            <Route path='/' element={<Home />}/>

            <Route path='*' element={<Errorpg />}/>


            </Routes>
            </Router>
            </div>
        </>
  )
}

export default App
