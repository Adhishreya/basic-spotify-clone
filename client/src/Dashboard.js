import React, { useState ,useEffect} from 'react';
import useAuth from './useAuth.js';
import {Container, Form} from 'react-bootstrap';
import TrackSearchResuts from './TrackSearchResuts.js';
import Player from './Player.js';
import axios from 'axios';

const SpotifyWebApi=require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '1518bdbffd05482982ff12bd0ee8801d'
  });

const Dashboard=({code})=>{
    const accessToken=useAuth(code);
        
    // console.log(code)
    // return <div>{code}</div>
    
    const [search,setSearch]=useState("");
    const [searchResults,setSearchResults]=useState([]);
    const [playingTrack,setPlayingTrack]=useState();
    const [lyrics,setLyrics]=useState("");
    // console.log(searchResults);
    function chooseTrack(track)
    {
         setPlayingTrack(track);
         setSearch('');
         setLyrics('');
    }

    useEffect(()=>{ 
        if(!playingTrack) return 
        axios.get('http://localhost:5000/lyrics',
        {
            params:{
                track:playingTrack.title,
                artist:playingTrack.artist
            }
        }).then(res=>{
            setLyrics(res.data.lyrics)
        })

    },[playingTrack])
    useEffect(()=>{
        if(!accessToken) return
        
        spotifyApi.setAccessToken(accessToken);
},[accessToken]);

useEffect(()=>
{
    if(!search) return setSearchResults([]);
    if(!accessToken) return 


    let cancel=false;
    spotifyApi.searchTracks(search).then(res=>{
        if(cancel==true)return

      setSearchResults(  res.body.tracks.items.map(track=>{
            const smallestAlbumImage =track.album.images.reduce(
                (smallest,image)=>{
                    if(image.height<smallest.height)return image;
                    return smallest

                },
                track.album.images[0]);
            return{
                artist:track.artists[0].name
                ,
                title:track.name,
                uri:track.uri,
                albumUrl:smallestAlbumImage.url


            }
        }))
    })
    //cancels the previous request made when a new request is made
    return ()=> cancel=true;
    
},[search,accessToken])
    return <Container className="d-flex flex-column py-2" style={{height:"100vh"}}>
        <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e=>setSearch(e.target.value)}></Form.Control>
        <div className="flex-grow-1 my-2" style={{overflowY:"auto"}}>{
            searchResults.map(track=>(
            
            <TrackSearchResuts track={track} chooseTrack={chooseTrack} key={track.uri}/>
            ))
        }
        
        {
            searchResults.length===0 && 
            <div className="text-center" style={{whiteSpace:"pre"}}>{lyrics}</div>
        }
        </div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
    </Container>
}

export default Dashboard;