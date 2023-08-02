import axios from 'axios'

export const GetAccessToken = () => { return localStorage.getItem('access_token')}


// axios interceptors for when the access token expires
axios.interceptors.request.use(
    config => {
        const token = GetAccessToken()
        if (token) {
            // setting the authorization header
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// if axios returns 401 error try to refresh the token
axios.interceptors.response.use((response) => {
    return response
},
    function (error) {
        const originalRequest = error.config
        const refresh_token = localStorage.getItem('refresh_token')    
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true            
            
            return axios.post('/api/refreshtoken', {
                refresh_token
            })
            .then(res => {    
                // if request is ok update the access token in localstorage            
                if (res.status === 200) {                    
                    localStorage.setItem("access_token", res.data.access_token)
                    // updating the headers with the new access token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`
                    return axios(originalRequest)
                }
            })
        }
    })

const heading = {
    Authorization: `Bearer ${GetAccessToken()}`
}


// ---------- Axios API calls ----------

// API call to get the information about the current user
// https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
export const getUser = async () => await axios.get('https://api.spotify.com/v1/me',{ heading })

// API call to get the user's following list
// https://developer.spotify.com/documentation/web-api/reference/get-followed
export const getFollowingUsers = async () => await axios.get('https://api.spotify.com/v1/me/following',{ heading, params: { type: 'artist' } })
        
// API call to get a user's saved playlists
// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export const getPlaylists = async () => await axios.get('https://api.spotify.com/v1/me/playlists',{ heading })

// API calls to get the top 10 artists and tracks for the home page
// https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export const getTopSongsDashboard = async () => await axios.get('https://api.spotify.com/v1/me/top/tracks', { heading, params: { time_range: "long_term", limit: 10} })
export const getTopArtistsDashboard = async () => await axios.get('https://api.spotify.com/v1/me/top/artists', { heading, params: { time_range: "long_term", limit: 10 } })


// API calls for getting the user's top songs for multiple time ranges
// https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export const getSongsTop = async () => await axios.get('https://api.spotify.com/v1/me/top/tracks', { heading, params: { time_range: "long_term", limit: 50} })
export const getSongsMedium = async () => await axios.get('https://api.spotify.com/v1/me/top/tracks', { heading, params: { time_range: "medium_term", limit: 50}})
export const getSongsShort = async () => await axios.get('https://api.spotify.com/v1/me/top/tracks', { heading, params: { time_range: "short_term", limit: 50} })

// API calls for getting the user's top artists for multiple time ranges
// https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export const getArtistsTop = async () => await axios.get('https://api.spotify.com/v1/me/top/artists', { heading, params: { time_range: "long_term", limit: 50} })
export const getArtistsMedium = async () => await axios.get('https://api.spotify.com/v1/me/top/artists', { heading, params: { time_range: "medium_term", limit: 50}})
export const getArtistsShort = async () => await axios.get('https://api.spotify.com/v1/me/top/artists', { heading, params: { time_range: "short_term", limit: 50} })

// API call for getting the user's recently played songs
// https://developer.spotify.com/documentation/web-api/reference/get-recently-played
export const getRecentlyPlayed = async () => await axios.get('https://api.spotify.com/v1/me/player/recently-played', { heading })

// API calls for getting data based on the params entered
export const getInfo = async (param, id) => await axios.get(`https://api.spotify.com/v1/${param}/${id}`)
export const getNextSongs = async (url) => await axios.get(url, { heading })

// recommended tracks are fetched from server

// exporting axios requests together
export const fetchUserData = () => 
    axios.all([getUser(), getFollowingUsers(), getPlaylists()]).then(axios.spread((user, following, playlists) => ({
        user: user.data,
        following: following.data,
        playlists: playlists.data
    })));

export const fetchUserSongs = () => 
    axios.all([getSongsTop(), getSongsMedium(), getSongsShort()]).then(axios.spread((top, medium, short) => ({
        top: top.data.items,
        medium: medium.data.items,
        short: short.data.items
    })));

export const fetchUserArtists = () =>
    axios.all([getArtistsTop(), getArtistsMedium(), getArtistsShort()]).then(axios.spread((longTermArtists, mediumTermArtists, shortTermArtists) => ({
        top: longTermArtists.data.items,
        medium: mediumTermArtists.data.items,
        short: shortTermArtists.data.items
    })))