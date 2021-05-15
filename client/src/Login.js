import React from 'react';
import {Container} from 'react-bootstrap'
const access="https://accounts.spotify.com/authorize?client_id=24268e5408a34f3a96c353ab9414c6ce&response_type=code&redirect_uri=http://localhost:5000/callback&scope=user-read-private%20streaming%20user-library-read%20user-read-email%20user-read-playback-state%20user-modify-playback-state"
const Login=()=>{
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <a className="btn btn-success btn-lg" href={access}>Login with Spotify</a>
        </Container>
    )
}

export default Login;