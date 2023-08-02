import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { getInfo } from '../../spotify/spotify'
import { generateArtists, getYear } from '../../utils/util'
import Spinner from '../Spinner'

import { BsArrowLeft } from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const ViewSong = () => {
    const data = useLocation()
    const artistId = data.state.id

    const [songData, setSongData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const test = await getInfo('tracks', artistId)            
            setSongData(test.data)
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const navigate = useNavigate()

  return (
      !loading ?
      <Container fluid className='p-0 m-0 navigate--container' >
          <div onClick={() => navigate(-1)} className='text-white rounded-circle navigate-back mx-3'><BsArrowLeft /></div>
            <img className='border-0 artist--view--image'  src={songData.album.images[0].url} alt={songData.album.name}/>
            <div className='py-5'>
                <img width={200} height={200} src={songData.album.images[0].url} alt={songData.album.name}/>
                <div className='text-white my-3 px-3'>
                    <h1 className='text-white m-1 fs-1'>{songData.name}</h1>
                    <p className='fs-6 m-1'>{songData.artists.length > 1 ? generateArtists(songData.artists)  :  songData.artists[0].name}</p>
                    <p>{songData.album.name} <span>&#x2022; </span> {getYear(songData.album.release_date)} </p> 
                    <Link to={songData.external_urls.spotify} target='_blank'><Button className='dash-btn rounded-pill py-2 px-4' variant='outline-white'>Listen on Spotify</Button></Link>
                </div>
            </div>
    </Container>  : <Spinner />
  )}

export default ViewSong