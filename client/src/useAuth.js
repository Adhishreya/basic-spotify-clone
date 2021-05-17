import {useState,useEffect} from 'react';
// import axios from "axios";

const useAuth =(code)=>{
    const [accessToken,setAccessToken]=useState();
    const [refreshToken,setRefreshToken]=useState();
    const [expiresIn,setExpiresIn]=useState();
    useEffect(()=>{
        fetch('http://localhost:5000/login',{method:'post',headers:{code}}).then(res=>{console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);//required to automatically regenrerate the expired tokens to prevent the users from logging in repeatedly
            setExpiresIn(res.data.expiresIn);
        //to redirect the user to the login page once the logincode expires
        window.history.pushState({},null,'/')
    }).catch(()=>
        window.location="/")
    },[code]);

useEffect(()=>{
    fetch('http://localhost:5000/refresh',{method:'post',headers:{refreshToken}}).then({
        // res=>{console.log(res.data);
    // setAccessToken(res.data.accessToken);
    // setRefreshToken(res.data.refreshToken);
    // setExpiresIn(res.data.expiresIn);
    //window.history.pushState({},null,'/')
}).catch(()=>
window.location="/")

    //execute whenever the previous token expires and new refresh token request is serviced
},[refreshToken,expiresIn])
    return(accessToken)
}
export default useAuth;