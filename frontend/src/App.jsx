import { useEffect, useState } from 'react'
import './App.css'
import MainAuth from './componenets/auth/MainAuth';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './componenets/home/Home';
import Errorpg from './componenets/error/Errorpg';

function App() {
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    },1000);
    return () => clearTimeout(timer);
  },[]);
  
  return (
        <>
        <Router>
            <Routes>
        
            <Route path='/auth' element={<MainAuth />}/>
            <Route path='/' element={<Home />}/>
            <Route path='*' element={<Errorpg />}/>

            </Routes>
            </Router>
        </>
  )
}

export default App
