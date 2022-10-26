import React from 'react';

let token = "";
const clientId = "4ffe3fec807d470da5caebdb025ca536";
const redirectURL = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (token)
        {
            return token;
        }
        else
        {
            // Check the URL of the page for accessToken and expiresInMatch
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch)
            {
                token = accessTokenMatch[1];
                const expiration = Number(expiresInMatch[1]);

                window.setTimeout(() => (token = ""), expiration * 1000);
                window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.

                return token;
            }
            else
            {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
                window.location = accessUrl;
            }

        }
    },

    async search(searchTerm) {

        this.getAccessToken();
        
        const searchTracks = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${token}`}
          });
        const trackJSON = await searchTracks.json();

        if (trackJSON.tracks.items)
        {
            return trackJSON.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                };
            });
        }
    },

    async save(name, tracks){
        if (name && tracks)
        {
            let userId = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            userId = await userId.json();
            userId = userId.id;

            let playlistId = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: name,
                  }),
                  json: true,
                }
            );

            playlistId = await playlistId.json();
            playlistId = playlistId.id;

            
            await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uris: tracks,
                }),
            });
        }
        return;
    }
}

export default Spotify;