const express=require('express')
const SpotifyWebApi=require('spotify-web-api-node')
const app=express();

app.post('/login',(req,res)=>{
    //generating credentials for acccesss
    var spotifyApi = new SpotifyWebApi({
        clientId: 'fcecfc72172e4cd267473117a17cbd4d',
        clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
        redirectUri: 'http://www.example.com/callback'
      });
})
