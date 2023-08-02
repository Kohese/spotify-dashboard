import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getInfo } from '../../spotify/spotify'
import Container from 'react-bootstrap/Container'
import { formatFollowers } from '../../utils/util'
import Spinner from '../Spinner'

import { Link, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'


const ViewUser = () => {
    const [artist, setArtist] = useState(null)
    const [loading, setLoading] = useState(true)

    // using useLocation to get the id of artist passed through state
    let data = useLocation()
    const navigate = useNavigate()
    const id = data.state.artist    

    // function to fetch the data using the id
    const fetchData = async () => {
        await getInfo('artists', id).then(response => { 
            try {
                setArtist(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })        
    }    

    useEffect(() => {
            fetchData() 
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        {artist !== null && !loading ? 
        <Container className='vh-100 navigate--container'>
            <div onClick={() => navigate(-1)} className='text-white rounded-circle navigate-back mx-3'><BsArrowLeft /></div>
            <div className='py-5 d-flex flex-column align-items-center'>
                <Link to={artist.external_urls.spotify} className='image--container text-white'>
                    <img className='artist--image rounded-circle' src={artist.images[0].url} height={250} width={250} alt={artist.name}/>
                    <div className='spotify--text'>
                        <div className='fs-6 listen--spotify'>Listen on Spotify</div>
                    </div>
                </Link>
                <Link to={artist.external_urls.spotify} className='text-white'><h1 className='artist-name fs-1 my-4'>{artist.name}</h1></Link>
                {/* <a href={artist.external_urls.spotify} target='_blank'><h1 style={{fontSize: '3rem'}} className='my-4'>{artist.name}</h1></a> */}
                <div key={`${artist.id}01`} className='d-flex justify-content-evenly justify-content-md-center gap-5 align-items-center text-white'>
                    <div>
                        <h2 className='text-secondary'>{formatFollowers(artist.followers.total)}</h2>
                        <h3 className='fw-bold'>Followers</h3>
                    </div>
                    <div>
                        {artist.genres.map(genre => <h2 className='text-secondary'>{genre}</h2>)}
                        <h3 className='fw-bold'>Genres</h3>
                    </div>
                    <div>
                        <h2 className='text-secondary'>{artist.popularity}%</h2>
                        <h3 className='fw-bold'>Popularity</h3>
                    </div>
                </div>
            </div>
        </Container>
        : <Spinner />}
        </>
    )
}

export default ViewUser