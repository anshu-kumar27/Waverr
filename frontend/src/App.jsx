import { useEffect, useState } from 'react'
import './App.css'
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
        hello world
        </>
  )
}

export default App
