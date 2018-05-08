let accessToken = null;
let expiresIn = 0;
const clientID = '0e744062a6a649659f46a354b2a06d9f';
const redirectURI = "http://localhost:3000/";



let Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    accessToken = window.location.href.match(/access_token=([^&]*)/);
    console.log(accessToken);
    expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(accessToken && expiresIn){
        accessToken = accessTokenMatch[1];
        expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
    }else{
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },
  search(term) {

      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` , {
      headers: {Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
       return response.json();
     }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          URI: track.uri
       }));
     }
   });
  }
};


export default Spotify;
