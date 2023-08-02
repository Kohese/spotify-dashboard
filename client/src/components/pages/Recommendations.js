import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Spinner from '../Spinner'

import { BsArrowLeft } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { generateArtists, getSongTime } from '../../utils/util'
const Recommendations = () => {
    const data = useLocation()
    const navigate = useNavigate()

    const [songs, setSongs] = useState(null)
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(true)

    let songsArray = data.state.songs
    songsArray = songsArray.slice(0, 100)
    songsArray = songsArray.map(song => song.track.id)    

    const fetchData = async () => {
        let shuffled = songsArray.sort(() => 0.5 - Math.random())
        shuffled = shuffled.slice(0, 5)
        try {
            axios.post('/api/recommendations', {
                shuffled, token
            })
            .then(res => {            
                setSongs(res.data.recommendations.tracks)
                localStorage.setItem('songs', JSON.stringify(res.data.recommendations.tracks))
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }    

    useEffect(() => {
        if(!localStorage.getItem('songs')) { fetchData() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (songs === null) { 
            setSongs(JSON.parse(localStorage.getItem('songs'))) 
            setLoading(false)
        }
    }, [songs])

    // Handle page reloads
    const clearStorage = () => {
        localStorage.removeItem("songs");
    };
    window.addEventListener("beforeunload", clearStorage)
    window.removeEventListener("beforeunload", clearStorage)

  return (
      <div className='h-100 navigate--container pb-4 px-4 my-5'>
        <div onClick={() => navigate(-1)} className='recommended-tracks text-white rounded-circle navigate-back mx-3'><BsArrowLeft /></div>
        <h2 className='text-white pt-3 mb-5'>Recommended tracks based on {data.state.playlist}</h2>        
        { songs !== null && !loading ?
        <main>
        {songs.map(song => {
            return (
                <Container fluid key={song.id} className='d-flex align-items-center my-4 p-0'>
                    <Link to={`/songs/${song.id}`} state={{id: song.id}}>
                        <div className='image--container'>                
                            <img className='artist--image' height={60} src={song.album.images[0].url} alt='Albums'/> 
                            <div className='spotify--text'> 
                                <div className='fs-2 text-white'><AiOutlineInfoCircle /></div>
                            </div>
                        </div>
                    </Link>
                        <Container fluid className='text-truncate text-start ms-2 my-auto d-flex justify-content-between align-items-center'>
                        <div className='text-truncate'>
                                <Link className='flex-child w-100 d-flex' to={`/songs/${song.id}`} state={{id: song.id}}>
                                    <h3 className='text-truncate hover-underline-animation text-white fs-6 m-0'>{song.name}</h3>
                                    </Link>
                            <p className='text-truncate text-secondary' style={{fontSize: '0.8rem'}}>{song.artists.length > 1 ? generateArtists(song.artists)  :  song.artists[0].name} <span>&#x2022; {song.album.name}</span></p> 
                        </div>
                            <div>
                                <p className='ps-4 text-secondary' style={{fontSize: '0.8rem'}}>{getSongTime(song.duration_ms)}</p>
                            </div>
                        </Container> 
                </Container>
            )
        })}
        </main>
         : <Spinner />}
    </div>
  ) 
}

export default Recommendations