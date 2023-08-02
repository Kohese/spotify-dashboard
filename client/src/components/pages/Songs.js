import React, { useEffect, useState } from 'react'
import { fetchUserSongs } from '../../spotify/spotify'
import { renderSongs } from '../../utils/util'

import Container from 'react-bootstrap/Container'

const Songs = () => {
  const [active, setActive] = useState("longTerm")

  const [longTermSongs, setLongTermSongs] = useState(null)
  const [mediumTermSongs, setMediumTermSongs] = useState(null)
  const [shortTermSongs, setShortTermSongs] = useState(null)

  const fetchData = async () => {
    const data = await fetchUserSongs()
    const { top, medium, short } = data

    setLongTermSongs(top)
    setMediumTermSongs(medium)
    setShortTermSongs(short)
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container fluid className='text-white px-md-5 pb-lg-0 px-sm-3 py-sm-3'>
      <div className='mb-4 py-3 d-flex flex-column flex-md-row justify-content-between align-items-center'>
        <h2 className='fw-bold'>Top Songs</h2>
        <div className='btn-width pt-4 pt-md-0 d-flex justify-content-md-end justify-content-around gap-3'>
          <button id="1" className={active === 'longTerm' ? 'active-btn bg-dark border-1': 'bg-dark border-0'} onClick={() => setActive("longTerm")}>All Time</button>
          <button id="2" className={active === 'mediumTerm' ? 'active-btn bg-dark border-1': 'bg-dark border-0'} onClick={() => setActive("mediumTerm")}>Last 6 Months</button>
          <button id="3" className={active === 'shortTerm' ? 'active-btn bg-dark border-1': 'bg-dark border-0'} onClick={() => setActive("shortTerm")}>Last 4 Weeks</button>
        </div>
      </div>
      <main className='h-100 mb-full'>
        {active === 'longTerm' && renderSongs(longTermSongs)}
        {active === 'mediumTerm' && renderSongs(mediumTermSongs)}
        {active === 'shortTerm' && renderSongs(shortTermSongs)}
      </main>
    </Container>
  )
}

export default Songs