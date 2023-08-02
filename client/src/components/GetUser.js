import React, { Component } from 'react'
import { fetchUserData  } from '../spotify/spotify.js'
import pfp from '../default.jpeg'
import { Link } from 'react-router-dom'


export default class GetUser extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            following: [],
            userPlaylists: [],
            loading: true
        }
    }

    componentDidMount() {
        const fetchData = async () => {
            const { following, playlists, user } = await fetchUserData()
            
            this.setState({
                following: following,
                userPlaylists: playlists,
                user: user,
                loading: false
            })                            
            return ( this.state.following, this.state.userPlaylists, this.state.user, this.state.loading )
        }
        return fetchData()
    }

  render() {
    const { following, userPlaylists, user } = this.state
    return (
        !this.state.loading ?
            <div className='text-white d-flex flex-column align-items-center'>
                <img className='rounded-circle' width={"150"} height={"150"} src={ user.images !== undefined && user.images.length === 0 ? pfp : user.images[1].url} alt={'Profile'}/>
                <Link to={user.external_urls.spotify} target='_blank'><h1 className='hover-underline-animation align-self-center m-0 mt-4 fs-1 text-white'>{user.display_name}</h1></Link>
                <div className='pt-4 d-flex justify-content-center gap-5 fs-4'>
                    <div>
                        <p className='text-success'>{user.followers.total}</p>
                        <p>Followers</p>
                    </div>
                    <div>
                        <p className='text-success'>{following.artists.total}</p>
                        <p>Following</p>
                    </div>
                    <div>
                        <p className='text-success'>{userPlaylists.total}</p>
                        <Link className='text-white' to='playlists'><p className='playlist-text-p text-white hover-underline-animation'>Playlists</p></Link>
                    </div>
                </div>
            </div> : <></>
    )}}