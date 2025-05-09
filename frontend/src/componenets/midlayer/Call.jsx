import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../loading/Loading';
import CallHistory from './callHistory/CallHistory';

function Call() {
  const [loading,setLoading] = useState(false);
  const [callHistory,setCallHistory] = useState([]);
  useEffect(()=>{
    const func = async()=>{
      try{
        setLoading(true);
        const result = await axios('/api/v1/callHistory',{credentials:'include'})
        setCallHistory(result.data.result || []);
      }catch(error){
        console.log("error");
      }finally{
        setTimeout(()=>{
          setLoading(false);
        },1500)
      }
    }

    func();
  },[])

  return (
    <>
    {/* <div className='h-[100vh] flex-1'>
      <Loading/>
    </div> */}
    {loading ? 
    <div className='h-[100vh] flex-1'>
      <Loading/>
    </div> :
    <div className='md:h-[100vh] flex-1 md:mt-0 mt-[2.5rem] overflow-auto h-[85vh]'>
    <div className='overflow-y-scroll h-[auto] md:p-6 pl-6 pr-6 pb-6'>
      <CallHistory callHistory={callHistory}/>
    </div>
    </div>
    }
    </>
  )
}

export default Call