import Container from 'react-bootstrap/Container'
import Spinner from '../components/Spinner'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useState } from 'react'

export const HandleLogin = (props, setState) => {
  (async () => { 
    if(!props) {
      try {
        await axios.post('/api/login')
        .then(res => {
          setState(res.data.login)          
        })
      } catch (error) {
        console.log(error)
      }
      finally {
        console.log('working')
      }
    }
  })()
}

export const HandleLogout = () => {
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('refresh_token')
  window.localStorage.removeItem('expires_in')
  window.localStorage.removeItem('code')  
  window.location.reload();
}

export const generateArtists = (arr) => {
  const names = []
  let string = ''
  if (arr !== null) {
      arr.map(x => {
          names.push(x.name)
          return names
      })
  }

  for (let i = 0; i < names.length; i++) {
      names[i] !== names[names.length - 1] ? string += names[i] + ', ' : string += names[i]
  }
  return string
}

export const renderSongs = (arr) => {
  return arr !== null ? 
      arr.map((song) => {
          return(
              <div key={song.id} className='d-flex px-md-4 justify-content-center my-4 vh-100' style={{ maxHeight: '60px'}}>
                <Link to={`/songs/${song.id}`} state={{id: song.id}}>
                  <div className='image--container'>                
                    <img className='artist--image' height={60} width={60} src={song.album.images[0].url} alt='Albums'/> 
                      <div className='spotify--text'> 
                        <div className='fs-2 text-white'><AiOutlineInfoCircle /></div>
                      </div>
                  </div>
                </Link>
                  <Container fluid className='text-truncate text-start ms-2 my-auto d-flex justify-content-between align-items-center'>
                    <div className='text-truncate'>
                          <Link className='w-100 d-flex' to={`/songs/${song.id}`} state={{id: song.id}}><h1 className='text-white hover-underline-animation text-truncate fs-6 m-0'>{song.name}</h1></Link>
                          <p className='text-truncate text-secondary fs-8 m-0'>{song.artists.length > 1 ? generateArtists(song.artists)  :  song.artists[0].name} <span>&#x2022; {song.album.name}</span></p> 
                    </div>
                      <div>
                          <p className='ps-4 text-secondary fs-8'>{getSongTime(song.duration_ms)}</p>
                      </div>
                  </Container> 
              </div> )
      }) : <Spinner />
}

export const getSongTime = (el) => {
  let minute = 0
  let second = 0
  second = Math.floor(Math.round(el / 1000))
  minute = Math.floor(second / 60)
  second = Math.floor(second % 60)
  return second < 10 ? `${minute}:0${second}` : `${minute}:${second}`
}

export const generateRandomString = (num) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for(let i = 0; i < num; i++) {
    res += num.charAt(Math.floor(Math.random() * possible.length))
  }
  return res
}

export const formatFollowers = (num) => {
  num = num.toString()
  let res = ''
  let count = 0
  for (let i = num.length - 1; i >= 0; i--) {
    res += num[i]
    count++
    if (count === 3 && i !== 0) {
      res += ','
      count = 0
    }
  }
  res = res.split('').reverse().join('')
  return res
}

export const getYear = (date) => {
  let split = date.split('-')
  return split[0]
}

export const scrolltotop = () => {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  })
}

export const GetWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  window.addEventListener('resize', () => {
  setWidth(window.innerWidth)
})
return width

}
