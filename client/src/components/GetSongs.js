import React, { useEffect, useState } from 'react'
import { getTopSongsDashboard } from '../spotify/spotify'
import { getSongTime, generateArtists } from '../utils/util'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Spinner from './Spinner'

const GetSongs = () => {
    const [topTracks, setTopTracks] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const { data } = await getTopSongsDashboard()
            setTopTracks(data.items)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
            fetchData()
    }, [])

    return (
        <div className='mb-4'>
            { topTracks !== null && !loading ? 
            topTracks.map((song) => {
                return (
                <div key={song.id} className='d-flex mb-4 gap-3 align-items-center justify-content-center'>
                    <Link to={`songs/${song.id}`} state={{id: song.id}}>
                        <div className='image--container'>                
                            <img className='artist--image' width={"60"} height={"60"} src={song.album.images[0].url} alt={song.name}/>
                            <div className='spotify--text'> 
                                <div className='fs-2 text-white'><AiOutlineInfoCircle /></div>
                            </div>
                        </div>
                    </Link>
                    <Container fluid className='text-start text-truncate d-flex justify-content-between align-items-center px-0'>
                        <div className='text-truncate'>
                            <Link className='w-100 d-flex' to={`songs/${song.id}`} state={{id: song.id}}>
                                <h2 className='text-white hover-underline-animation text-truncate fs-6 mb-1'>{song.name}</h2>
                            </Link>
                            <p className='d-block text-truncate text-secondary fs-8 m-0'>{song.artists.length > 1 ? generateArtists(song.artists) : song.artists[0].name} <span>&#x2022; {song.album.name}</span></p> 
                        </div>
                        <div>
                            <p className='ps-4 fs-8 text-secondary'>{getSongTime(song.duration_ms)}</p>
                        </div>
                    </Container> 
                </div>
            )}) : <Spinner />}
        </div>
    )
}

export default GetSongs