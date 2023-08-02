import React, { useState, useEffect} from 'react'
import Spinner from '../Spinner'
import { useLocation } from 'react-router'
import { getInfo, getNextSongs } from '../../spotify/spotify'
import { generateArtists, getSongTime } from '../../utils/util'
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Pagination from '../Pagination'
import { BsArrowLeft } from 'react-icons/bs'

import { Link, useNavigate } from 'react-router-dom'


const ViewPlaylist = () => {
    const [playlist, setPlaylist] = useState(null)
    const [playlistTracks, setPlaylistTracks] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [songsPerPage] = useState(playlistTracks !== null && playlistTracks.length > 100 ? 25 : 20)

    const data = useLocation()

    const getNextPlaylistSongs = async (url) => {
        let link = url
        if (link === null) return
        try {
            await getNextSongs(link).then(res => {
                // combine the new array with the old one
                setPlaylistTracks(old => [...old, ...res.data.items])
                link = res.data.next
                if (!res.data.next)  return 
            })
            getNextPlaylistSongs(link)
        } catch (error) {
            console.log(error)
        }
    }

    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    const fetchData = async () => {
        if (localStorage.getItem('songs')) { localStorage.removeItem('songs') }
        await getInfo('playlists', data.state.playlist).then(response => { 
            try {
                setPlaylist(response.data)
                setPlaylistTracks(response.data.tracks.items)
                // if there are more songs in playlist get the next array of songs
                    if (response.data.tracks.next || (playlistTracks !== null && playlistTracks.length !== response.data.tracks.total)) { 
                        getNextPlaylistSongs(response.data.tracks.next) 
                    }
            } catch (error) {
                console.log(error)
            }
        })
    }
 
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    


    // Get current songs
    const indexOfLastSong =  playlistTracks !== null && currentPage * songsPerPage > playlistTracks.length ? playlistTracks.length : currentPage * songsPerPage
    const indexOfFirstSong = indexOfLastSong - songsPerPage
    const currentSongs = playlist !== null ? playlistTracks.slice(indexOfFirstSong, indexOfLastSong) : null
    const navigate = useNavigate()
    return (
    <div className='navigate--container h-100'>
        {playlist!== null && playlist.tracks.total === playlistTracks.length ? 
        <Container fluid className='px-4 py-4 my-3'>
            <Row>
                <Col className='d-flex justify-content-center' md={5} lg={4}>
                    <div className='playlist-info mt-md-5 mb-2 mb-sm-0 text-secondary mx-auto' style={{maxWidth: '250px'}}>
                        <div onClick={() => navigate(-1)} className='playlist-navigate text-white rounded-circle navigate-back mx-3'><BsArrowLeft /></div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <Image fluid className='mb-3' height={225} src={playlist.images[0].url} alt={`${playlist.name} playlist`}/>
                            <div className='d-flex flex-column align-items-center'>                            
                                <Link to={playlist.external_urls.spotify} target='_blank'><h2 className='text-white fs-3 hover-underline-animation'>{playlist.name}</h2></Link>
                                <div className='d-flex gap-1'>
                                    <p className='mb-1'>By</p>
                                <Link to={playlist.owner.external_urls.spotify} target='_blank'><p className='text-secondary hover-underline-animation owner-name m-0'>{playlist.owner.display_name}</p></Link>
                                </div>
                                <p className='fs-8 mb-1'>{playlist.description.replace('&amp;', '&')}</p>
                                <p>{playlist.tracks.total} Tracks</p>
                            </div>
                        </div>
                    <Link to={`/recommendations/${playlist.id}`} state={{songs: playlistTracks, playlist: playlist.name}}><Button variant='outline-success' className='rounded-pill mb-md-0 mb-5'>Get Track Recommendations</Button></Link>
                    </div>  
                </Col>
                <Col md={7} lg={8} className='pe-lg-5 px-4'>
                    {currentSongs.map((tracks, index) => {
                        // console.log(tracks.track)
                        const { album, id, name, artists, duration_ms } = tracks.track
                        return (                            
                            <div key={`${id}-${index}`} className='d-flex gap-3 mx-auto mb-3 playlist-songs'>
                                <Link to={`/songs/${id}`} state={{id: id}}>
                                    <div className='image--container playlist--songs'>                
                                    <img className='artist--image' width={50} height={50} src={album.images[0].url} alt={`${name} song`}/>
                                        <div className='spotify--text'> 
                                            <div className='fs-2 text-white'><AiOutlineInfoCircle /></div>
                                        </div>
                                    </div>
                                </Link>                             
                                <div className='text-start d-flex text-truncate justify-content-between align-items-center w-100'>
                                    <div className='text-truncate my-auto'>
                                        <Link className='w-100 flex-child d-flex' to={`/songs/${id}`} state={{id: id}}>
                                            <h3 className='hover-underline-animation fs-5 text-truncate mb-0 text-white'>{name}</h3>   
                                        </Link>
                                        <p className='fs-8 text-truncate text-secondary'>{artists.length > 1 ? generateArtists(artists) : `${artists[0].name}`}<span> &#x2022; {album.name}</span></p>
                                    </div>
                                    <div className='ms-3 text-secondary'>
                                        <p className='fs-8'>{getSongTime(duration_ms)}</p>
                                    </div>
                                </div>
                            </div>
                        )})}
                </Col>
            <Pagination songsPerPage={songsPerPage} totalSongs={playlistTracks.length} paginate={paginate}/>
            <p className='text-white'>Showing <span className='text-success'>{indexOfFirstSong + 1}</span> - <span className='text-success'>{indexOfLastSong}</span> out of <span className='text-success'>{playlistTracks.length}</span></p>
            </Row>
        </Container> : <Spinner />}
    </div>        
  )
}

export default ViewPlaylist