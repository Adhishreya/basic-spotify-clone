import React from 'react';
import useAuth from './useAuth.js'

const Dashboard=({code})=>{
    const token=useAuth(code);
    console.log(token)
    return <div>{code}</div>
}

export default Dashboard;