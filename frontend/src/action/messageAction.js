import axios from 'axios';
// import {useEffect, useState} from 'react'
// import { zustandStore } from '../zustand/zustand';
import { toast } from 'react-toastify';

export const handleSubmit=async({text,image,userId})=>{
    console.log("finally here")
    if(!text && !image){
        toast.error("Enter something before sending...")
        return;
    }
    try{
        const res = await axios.post(`/api/v1/send/:${userId}`,{
            credentials: 'include'}
        )
        console.log('success ',res);

    }catch(error){
        toast.error("Failed while submitting the message")
        console.log("error ",error)
    }
}
