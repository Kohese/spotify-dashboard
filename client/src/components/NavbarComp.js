import React, { useState } from 'react'
import './styles/SideBar.css'
import { scrolltotop } from '../utils/util'
import { GiMicrophone } from 'react-icons/gi'
import { ImHome } from 'react-icons/im'
import { BsFillMusicPlayerFill, BsGithub, BsSpotify } from 'react-icons/bs'
import { RiPlayList2Fill } from 'react-icons/ri'
import { RxCounterClockwiseClock } from 'react-icons/rx'

import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'


const NavbarComp = () => {
  const [width, setWidth] = useState(window.innerWidth)
  window.addEventListener('resize', () => {
  setWidth(window.innerWidth)
  })

  const tabs = [{
    route: '',
    icon: <ImHome />,
    label: 'Profile'
  }, 
  {
    route: 'artists',
    icon: <GiMicrophone />,
    label: width < 992 ? 'Artists' : 'Top Artists'
  }, 
  {
    route: 'songs',
    icon: <BsFillMusicPlayerFill />,
    label: width < 992 ? 'Songs' : 'Top Songs'
  },
  {
    route: 'playlists',
    icon: <RiPlayList2Fill />,
    label: 'Playlists'
  },
  {
    route: 'recent',
    icon: <RxCounterClockwiseClock />,
    label: 'Recent'
  }]

  return (
    <>
    <Nav className="d-none align-items-center d-md-block bg-black sidebar">
    <div className='h-100 d-flex flex-column justify-content-lg-evenly justify-content-center gap-md-5'>
      <NavLink to={''}>
        <BsSpotify className='icon--hover mx-auto' size={50}/>
      </NavLink>
      <div>
        {tabs.map((tab, index) => {
            return(
            <NavLink className='desktop-nav' to={tab.route} key={`link-0${index}`}>
              <Nav.Item style={{height: '80px'}} key={`tab-0${index}`} className='p-2 w-100'>
                <div className='text-white' style={{width: '100px'}}>
                  {tab.icon}
                  <p>{tab.label}</p>
                </div>
              </Nav.Item>
            </NavLink>
            )})}
      </div>
      <div className='d-block mx-auto'>
        <NavLink to={'https://github.com/mars1448/spotify-profile'} target='_blank'><BsGithub className='text-white icon--hover' size={50} /></NavLink>
      </div>
    </div>
    </Nav>

    <Nav className='d-block d-md-none fixed-bottom bg-black'>
      <div className='d-flex'>
      {tabs.map((tab, index) => {
        return(
        <NavLink className={'w-100 mobile-nav'} to={tab.route} onClick={() => { scrolltotop() }} key={`link-0${index}`}>
          <div>
          <Nav.Item key={`tab-0${index}`} className='p-2 w-100'>
            <div className='mt-2 row d-flex flex-column text-center text-white'>
              {tab.icon}
              <p className='mt-1 fs-7'>{tab.label}</p>
            </div>
          </Nav.Item>
          </div>
        </NavLink>
        )})}
      </div>
    </Nav>
</>    
  )}

export default NavbarComp