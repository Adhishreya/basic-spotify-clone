const express=require('express')
const SpotifyWebApi=require('spotify-web-api-node')
const app=express();
app.get('/',(req,res)=>{
  res.send('Hello')
})
app.post('/callback',(req,res)=>{
    const code=req.body.code
    //generating credentials for acccesss
    var spotifyApi = new SpotifyWebApi({
        clientId: '24268e5408a34f3a96c353ab9414c6ce',
        clientSecret: '3addc2ff48704ed08acc7918a173a6ac',
        redirectUri: 'http://localhost:3000/callback/'
      });
      spotifyApi.authorizationCodeGrant(code).then(data=>{
          res.json({
            accessToken:data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn:data.body.expires_in
          })
          

      }).catch(()=>
      res.sendStatus(400),console.log('listening'))
})

app.listen(5000);