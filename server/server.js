const express=require('express')
const SpotifyWebApi=require('spotify-web-api-node')
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('Hello')
})
app.post('/refresh',(req,res)=>{
  const refreshToken=req.headers.refreshToken;
  var spotifyApi = new SpotifyWebApi({
    clientId: '1518bdbffd05482982ff12bd0ee8801d',
    clientSecret: '8e0555e45af446a5a1abf749652ed51d',
    redirectUri: 'http://localhost:3000/callback/',
    refreshToken
  });
  console.log(rerq.headers)
  spotifyApi.refreshAccessToken().then(
    (data) =>{
        console.log(data)
    },
   
  ).catch(()=>res.sendStatus(400));
})

app.post('/login',(req,res)=>{
    const code=req.headers.code
    //generating credentials for acccesss
    var spotifyApi = new SpotifyWebApi({
        clientId: '1518bdbffd05482982ff12bd0ee8801d',
        clientSecret: '8e0555e45af446a5a1abf749652ed51d',
        redirectUri: 'http://localhost:3000/callback/'
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
})

app.listen(5000,console.log('listening'));