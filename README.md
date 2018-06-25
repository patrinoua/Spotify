# Spotify
Spotify Search


Spotify used to have a search API that didn't require authentication and supported CORS. It now requires authentication and pretty much can't be used via ajax directly. 
However, instead of https://api.spotify.com/v1/search, I am using the following url, 
passing to it all of the query string parameters that I would have passed to Spotify's endpoint: https://elegant-croissant.glitch.me/spotify. 
This url will make a request to the Spotify search API with the parameters you specify and send back the exact JSON that Spotify responds with.
This app is conducting searches for artists and albums and then display the results in a pleasing manner.
