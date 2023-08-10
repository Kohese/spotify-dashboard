const express = require("express")
const cors = require('cors')
const dotenv = require("dotenv").config()
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

const PORT = process.env.PORT || 3001

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET

const RESPONSE_TYPE = 'code'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const SCOPE_PARAM = ["user-read-recently-played","user-top-read","playlist-read-private","playlist-read-collaborative","user-read-private","user-follow-read"]

app.use(express.static(path.join(__dirname, '../', 'client', 'build')))

const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'),
    function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.post('/api/login', (req, res) => {
    res.json({
        login: `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_PARAM}&response_type=${RESPONSE_TYPE}`
    })
})

app.post('/api/token', (req, res) => {    
    const code = req.body.code

    spotifyApi.authorizationCodeGrant(code).then(data => {        
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })

        spotifyApi.setAccessToken(data.body.access_token)
        spotifyApi.setRefreshToken(data.body.refresh_token)
    })
    .catch((err) => console.log(err))
})

app.post('/api/refreshtoken', (req, res) => {
    spotifyApi.setRefreshToken(req.body.refresh_token)
    spotifyApi.refreshAccessToken().then(data => {        
        res.json({
            access_token: data.body.access_token,
        })
    })
    .then(() => console.log('token refreshed'))
})

app.post('/api/recommendations', (req, res) => {    
    spotifyApi.setAccessToken(req.body.token)
    spotifyApi.getRecommendations({
        seed_tracks: req.body.shuffled
    })
    .then((data) => {
        res.json({
            recommendations: data.body
        })                
    }, (err) => {
        console.log(err)
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})