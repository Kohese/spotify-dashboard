# Spotify Dashboard

A web application for spotify users to see their top artists and songs.

## Technologies Used 
  - React
  - Bootstrap
  - Node JS
  - Express

## Description
This web application allows users to see their top artists and songs over time, and get recommendations on similar artists/songs based on their favorite songs.

## Setup and Installation
  - Clone the repository and inside of a terminal run the following commands
    ```
    cd server
    npm install
    ```
  - Next, you will need to create a spotify app which can be done [here](https://developer.spotify.com/dashboard)
  - For hosting locally, the redirect uri address should be `http://localhost:3001/callback`
  - After creating the spotify app, navigate to the server folder and create a `.env` file to store your keys
  - Inside of the `.env` file, add the following variables with your keys
    ```
    CLIENT_ID = * YOUR CLIENT ID HERE *
    REDIRECT_URI = * YOUR REDIRECT URI HERE *    
    CLIENT_SECRET = * YOUR CLIENT SECRET HERE *

    --- OPTIONAL ---
    PORT = * PORT NUMBER HERE *
    ```
  - Now you are ready to run the app! while inside the server directory, run the command `node index.js` and use your browser of choice to navigate to [http://localhost:3001](http://localhost:3001)

## Future Plans
  - Add an artist's top songs on their page
  - Add recommendations for similar artists

## Known Bugs
  - Cannot retrieve top stats for inactive accounts. Planning to fix soon.
