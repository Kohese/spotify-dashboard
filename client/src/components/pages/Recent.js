import React, { useEffect, useState } from 'react'
import { getRecentlyPlayed } from '../../spotify/spotify'
import { generateArtists, getSongTime } from '../../utils/util'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Spinner from '../Spinner'

const Recent = () => {
    const [recentSongs, setRecentSongs] = useState([])
    const fetchData = async () => {
        try {
            const { data } = await getRecentlyPlayed()
            setRecentSongs(data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

  return (
    <Container fluid className='text-white pb-lg-0 px-3 px-md-5 py-sm-3'>
        <div className='mb-4 py-3'>
            <h2 className='mb-5 fw-bold'>Recently Played</h2>
            <main >
                { recentSongs !== null ? recentSongs.map((song, index) => {
                    const { track } = song;
                    return (
                        <div key={`${track.id}-${index}`} className='d-flex gap-2 align-items-center justify-content-center mb-4'>
                            <Link to={`/songs/${track.id}`} state={{id: track.id}}>
                                <div className='image--container'>                
                                    <img className='artist--image' width={"70"} height={"70"} src={track.album.images[0].url} alt={track.name}/> 
                                    <div className='spotify--text'> 
                                        <div className='fs-2 text-white'><AiOutlineInfoCircle /></div>
                                    </div>
                                </div>
                            </Link>
                        <Container className='text-truncate text-start d-flex justify-content-between align-items-center'>                            
                            <div className='text-truncate'>
                                <Link className='recent-text' to={`/songs/${track.id}`} state={{id: track.id}}><h3 className='text-white m-0 hover-underline-animation text-truncate fs-6'>{track.name}</h3></Link>
                                <p className='d-block text-truncate artist-name text-secondary fs-8 m-0'>{track.artists.length > 1 ? generateArtists(track.artists)  :  track.artists[0].name} <span>&#x2022; {track.album.name}</span></p> 
                            </div>                            
                            <div>
                                <p className='text-secondary ps-3 fs-8'>{getSongTime(track.duration_ms)}</p>
                            </div>
                        </Container> 
                    </div>
                )}) : <Spinner />}
            </main>
        </div>
    </Container>    
  )
}

export default Recent
