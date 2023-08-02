import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { getPlaylists } from '../../spotify/spotify'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'

const Playlists = () => {
    const [playlists, setPlaylists] = useState([])
    const fetchData = async () => {
    try {
        const { data } =  await getPlaylists()        
        setPlaylists(data.items)
    } catch (error) {
        console.log(error)
    }
    }
    useEffect(() => {
        fetchData()
    }, [])

  return (
      <Container fluid className='text-white pb-lg-0 px-5 py-sm-3'>
        <div className='mb-4'>
            <h2 className='mb-5 mt-3 fw-bold'>Your Saved Playlists</h2>
            <div className='playlist-grid px-lg-4'>        
                {playlists !== null ? playlists.map(playlist => {
                    const { images, name, id, tracks } = playlist
                    return (
                        <div key={id}>
                            <Link to={`/playlists/${id}`} state={{ playlist: id}}>
                                <img style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}} className='mb-2 playlist-img' src={images[0].url} alt={`playlist: ${name}`}/>
                                <p className='text-wrap text-white m-0'>{name}</p>
                                <p className='text-secondary text-uppercase fs-8'>{tracks.total} Tracks</p>
                            </Link>
                        </div>
                    )}) : <Spinner />}
            </div>
        </div>
    </Container>
    )}

export default Playlists