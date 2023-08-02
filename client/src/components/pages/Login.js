import React, { useEffect, useState } from 'react'
import { HandleLogout, HandleLogin } from '../../utils/util'

import Button from 'react-bootstrap/Button'

const Login = (props) => {
    const [link, setLink] = useState('');

    useEffect(() => {
      try {
        HandleLogin(props.isLoggedIn, setLink)
      } catch (error) {
        console.log(error)
      }
    }, [])

  return (
    <div>
      <div className={ !props.isLoggedIn ? 'login-btn' : 'pb-4'}>
          <h1 className={!props.isLoggedIn ? 'text-white d-block' : 'd-none'}>Your Spotify Profile</h1>          
          <a href={!props.isLoggedIn ? link : ''}><Button variant='outline-white' className='rounded-pill dash-btn m-3 fs-5 py-2 px-5' onClick={!props.isLoggedIn ? () => {} : HandleLogout}>{!props.isLoggedIn ? 'Login to Spotify' : 'Log out'}</Button></a>
      </div>
    </div>
  )}

export default Login