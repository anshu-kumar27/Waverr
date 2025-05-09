import axios from 'axios';
import Loading from '../../../loading/Loading';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import ConnectSkeleton from './ConnectSkeleton';

function Connect() {
    const [loading,setLoading] = useState(false);
    const [addNetwork,setAddNetwork] = useState([]);
    const [profile , setProfile] = useState(null);
    useEffect(()=>{
        const func = async() =>{
            try{
                setLoading(true);
                const result = await axios.get('api/v1/addFriends',{credentials: 'include'});
                setAddNetwork(result.data.filteredUsers || []);
                setProfile(result.data.profile || {})
                console.log(result.data)
            }catch(error){
                toast.error(error.message)
            }finally{
                    setLoading(false);
            }
        }
        func();
    },[])
  return (
    <>
  {loading ? (
    <Loading />
  ) : (
    addNetwork.map((item, indx) => (
      <div key={indx}><ConnectSkeleton item={item} profile={profile}/></div>
      
    ))
  )}
  <ToastContainer position="top-center" autoClose={2000} />
</>
  )
}

export default Connect