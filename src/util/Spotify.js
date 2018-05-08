let accessToken;
const clientID = '0e744062a6a649659f46a354b2a06d9f';
const redirectURI = "http://marioJamz.surge.sh";

let Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch && expiresInMatch){
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
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
 },
 savePlaylist(playlistName, tracks){
   if(playlistName && tracks){
     let token = this.getAccessToken();
     let headers = {
       "Authorization":`Bearer ${token}`
     };
     let userID;
     let playlistID
     return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
       return response.json()
     }).then(jsonResponse => {
       userID = jsonResponse.id;
     }).then(() => {
       return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
         method:'POST',
         headers:{
           "Authorization":`Bearer ${token}`,
           "Content-Type": 'application/json'
         },
         body:JSON.stringify({name:playlistName})
       })
     }).then(response => {
       return response.json();
     }).then(jsonResponse => {
       playlistID = jsonResponse.id;
     }).then(() => {
       return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
         method:'POST',
         headers:{
           "Authorization":`Bearer ${token}`,
           "Content-Type": 'application/json'
         },
         body:JSON.stringify({'uris':tracks})
       })
     }).then(response => {
       return response.json();
     }).then(jsonResponse => {
       playlistID = jsonResponse.id;
   })}else{
     return;
   }

 }
};



export default Spotify;
