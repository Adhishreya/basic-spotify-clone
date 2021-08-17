require('dotenv').config()
const express=require('express')
const SpotifyWebApi=require('spotify-web-api-node')
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
const lyricsFinder=require('lyrics-finder')
app.get('/',(req,res)=>{
  res.send('Hello')
})
app.post('/refresh',(req,res)=>{
  const refreshToken=req.body.refreshToken;
  console.log("request token is "+refreshToken)
  var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri:  process.env.REDIRECT_URI,
    refreshToken
  });
  // console.log(req.headers)
  spotifyApi.refreshAccessToken().then(
    (data) =>{
        console.log(data.body);
        res.json({
      
          accessToken:data.body.accessToken,
          expiresIn:data.body.expiresIn,

        })
    },
   
  ).catch(()=>res.sendStatus(400));
})

app.post('/login',(req,res)=>{
    const code=req.body.code;
    //generating credentials for acccess
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri:  process.env.REDIRECT_URI
      });
      // console.log(code)
      spotifyApi.authorizationCodeGrant(code).then(data=>{
       
          res.json({
            accessToken:data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn:data.body.expires_in
          })
          

      }).catch((error)=>
      {console.log(error)
        res.sendStatus(400)})
});

app.get('/lyrics',async(req,res)=>{
  const lyrics=await lyricsFinder(req.query.artist,req.query.track)||"No lyrics found";
  res.json({lyrics})
})

app.listen(5000,console.log('listening'));