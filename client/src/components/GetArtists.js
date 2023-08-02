import { React, useEffect, useState } from 'react'
import { getTopArtistsDashboard } from '../spotify/spotify'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const GetArtists = () => {
  const [topArtists, setTopArtists] = useState(null)

  const fetchData = async () => {
    try {
      const { data } = await getTopArtistsDashboard()
      setTopArtists(data.items)
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <div className='mb-4'>
      {topArtists !== null ? 
      topArtists.map((artist) => {
        return (
          <div className='d-flex align-items-center mb-4 gap-3' 
           key={artist.id}>
            <Link to={`/artists/${artist.id}`} state={{ artist: artist.id}} className='text-white'>
              <div className='image--container'>
                <img className='rounded-circle artist--image' width={"60"} height={"60"} src={artist.images[0].url} alt="" />
                <div className='spotify--text'>
                  <div className='fs-2'><AiOutlineInfoCircle /></div>
                </div>
              </div>
            </Link>
            <Link to={`/artists/${artist.id}`} state={{ artist: artist.id}}><h2 className='hover-underline-animation text-white fs-6 m-0'>{artist.name}</h2></Link>
            </div>
        )})
       : <Spinner />}
    </div>
  )
}

export default GetArtists