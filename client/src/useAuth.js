import {useState,useEffect} from 'react';
import axios from "axios";

const useAuth =(code)=>{
    const [accessToken,setAccessToken]=useState();
    const [refreshToken,setRefreshToken]=useState();
    const [expiresIn,setExpiresIn]=useState();
    useEffect(()=>{
    axios.post('http://localhost:5000/login',{
        code
    }).then(res=>
        {
                
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);//required to automatically regenrerate the expired tokens to prevent the users from logging in repeatedly
        setExpiresIn(res.data.expiresIn);
        // setExpiresIn(61);
    //to redirect the user to the login page once the logincode expires
        window.history.pushState({},null,'/')
        })
        .catch(()=>{
            window.location='/'
                   }
              )
    },[code]);

    useEffect(()=>{
 //execute whenever the previous token expires and new refresh token request is serviced
        if(!refreshToken|| !expiresIn) return

        const timeOut=setInterval(() => {
 axios.post('http://localhost:5000/refresh',{
    refreshToken
}).then(res=>{
    
setAccessToken(res.data.accessToken);
setExpiresIn(res.data.expiresIn);
// setExpiresIn(61);
console.log(res);

})
.catch((err)=>{

    window.location="/"
    console.log(err);
}
);
        },(expiresIn-60)*1000);

        return ()=>clearInterval(timeOut)

    },[refreshToken,expiresIn])

    return accessToken

}
export default useAuth;