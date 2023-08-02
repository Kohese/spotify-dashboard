import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { fetchUserArtists } from '../../spotify/spotify'
import Spinner from '../Spinner'

const Artists = () => {

  const [active, setActive] = useState("longTerm")
  const [loading, setLoading] = useState(true)
  
  const [longTermArtists, setLongTermArtists] = useState(null)
  const [mediumTermArtists, setMediumTermArtists] = useState(null)
  const [shortTermArtists, setShortTermArtists] = useState(null)
  
  const fetchData = async () => {
    try {
      const  data  = await fetchUserArtists()
      const { top, medium, short } = data
      
      setLongTermArtists(top)
      setMediumTermArtists(medium)
      setShortTermArtists(short)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()    
  }, [])

  
  const DisplayArtists = (arr) => {    
    return arr !== null && !loading ? arr.map(element => { 
      const { id, images, name } = element
      return (
        <div key={id} className='artist-max mx-2'>
          <Link to={`/artists/${id}`} state={{ artist: id }} className='text-white'>
            <div className='d-flex flex-column align-items-center'>
              <div className='image--container'>
                <Image className='artist--image rounded-circle artist-img mb-2' width={150} height={150} src={ images[0].url } alt={name}/>
                <div className='spotify--text'>
                  <div className='fs-2'><AiOutlineInfoCircle /></div>
                </div>
              </div>
              <p className='hover-underline-animation text-white fs-6 text-wrap fw-bold'>{ name }</p>
            </div>
          </Link>
        </div>
      )}) : <Spinner />
    }

  return (
    <Container fluid className='text-white px-md-5 pb-lg-0 px-sm-3 py-sm-3'>
        <div className='mb-4 py-3 d-flex flex-column flex-md-row justify-content-between align-items-center'>
          <h2 className='fw-bold'>Top Artists</h2>
          <div className='btn-width pt-4 pt-md-0 d-flex justify-content-md-end text-secondary justify-content-around gap-3'>
            <button id="1" className={active === 'longTerm' ? 'active-btn bg-dark border-1': ' bg-dark border-0'} name='longTermArtists' onClick={() => setActive("longTerm")}>All Time</button>
            <button id="2" className={active === 'mediumTerm' ? 'active-btn bg-dark border-1': 'bg-dark border-0'} name='mediumTermArtists' onClick={() => setActive("mediumTerm")}>Last 6 Months</button>
            <button id="3" className={active === 'shortTerm' ? 'active-btn bg-dark border-1': 'bg-dark border-0'} name='shortTermArtists' onClick={() => setActive("shortTerm")}>Last 4 Weeks</button>
          </div>
        </div>
    <main className='d-flex px-1 flex-wrap justify-content-center gap-sm-5 gap-4'>
      {active === 'longTerm' && DisplayArtists(longTermArtists)}
      {active === 'mediumTerm' && DisplayArtists(mediumTermArtists)}
      {active === 'shortTerm' && DisplayArtists(shortTermArtists)}
    </main>
    </Container>
  )}

export default Artists