import{ 
    CLEAR_ERRORS, 
    FILTERED_USER_FAIL, 
    FILTERED_USER_REQUEST, 
    FILTERED_USER_SUCCESS, 
    LOAD_USER_FAIL, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_USER_FAIL, 
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants'
import axios from 'axios'
export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('/api/v1/login',
        {email,password},
        config
        )
        console.log('log in data', data);

        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }catch(error){
        // console.log('error is this ',error.response.data.err)
        dispatch({type:LOGIN_FAIL,payload:error.response.data.err})
        console.log(error.response.data);
    }
}

// REGISTER user
export const register = (firstName,lastName,email,password) => async(dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`/api/v1/register`,{firstName:firstName,lastName:lastName,email:email,password:password},config);

        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
    }catch(error){
        console.log(error)
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:error.response.data.err,

        })
    }
}

//loading a user who is already logged in 
export const loadUser = () => async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/v1/me',{
        credentials: 'include',}
      )
      console.log("data");
        dispatch({type:LOAD_USER_SUCCESS, payload: data.user})
    }catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.err
        })
    }
}

//logout
export const logout = () => async(dispatch) =>{
    try{
        await axios.get('/api/v1/logout')
        dispatch({type:LOGOUT_SUCCESS});
    }catch(error){
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.err})
    }
}

// update profile 
export const updateProfile = (userData) => async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const {data} = await axios.put('/api/v1/me/update')
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user})
    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.err})
    }
}

// fetching all the user other than ourself // filtered user
export const filterdUsers = () => async(dispatch)=>{
    try{
        dispatch({type:FILTERED_USER_REQUEST})
        const {data} = await axios.get('/api/v1/allusers',{
            credentials:'include'
        })
        dispatch({type:FILTERED_USER_SUCCESS,payload:data.filteredUsers})
    }catch(error){
        dispatch({type:FILTERED_USER_FAIL,payload:error.response.data.err})
    }
}

// clearing errors 
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS}) 
}


