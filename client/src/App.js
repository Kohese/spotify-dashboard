
import "./App.css";
import "./spotify/spotify.js";

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { Router } from './routes/Router'

import Dash from "./components/pages/Dash";
import Login from "./components/pages/Login";
import NavbarComp from "./components/NavbarComp";


function App() {

  // Get code from URL and store in localhost if not null
  const codeParam = new URLSearchParams(window.location.search).get('code')
  if (codeParam !== null) { localStorage.setItem('code', codeParam)}
  
  const { pathname } = useLocation()

  return (
    <div className="App-Container">
      { pathname !== '/login' && <NavbarComp /> }
      <div className={pathname !== '/login' ? "App ms-lg-5" : "App"}>
          <Routes>
            <Route path='/login' element={!localStorage.getItem('code') ? <Login /> : <Navigate replace to='/' />} />
            {Router.map((route, index) => {
              const { path, element } = route
              return (
                <Route key={`${path}--0${index}`} path={path} element={localStorage.getItem('access_token') ? element : <Navigate replace to='/login' />}/>
              )
            })}
            <Route exact path="/" element={localStorage.getItem('code') ? <Dash code={localStorage.getItem('code')}/> : <Navigate replace to='/login' />}/>
            {/* <Route path='/callback' element={codeParam ? <Navigate replace to='/' /> : <p>Loading...</p>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/artists/:id' element={<ViewUser />}/>
            <Route path='songs' element={<Songs />} />
            <Route path='/recent' element={<Recent />} />
            <Route path='/playlists' element={<Playlists />} />
            <Route path='/playlists/:id' element={<ViewPlaylist />} /> 
            <Route path='/recommendations/:id' element={<Recommendations />}/>           
          <Route exact path="/" element={localStorage.getItem('code') ? <Dash code={localStorage.getItem('code')}/> : <Navigate replace to='/login' />}/> */
          }
          {/* <Route path='*' element={<Navigate replace to='/login' />} /> */}
          </Routes> 
      </div>
    </div>
    )}

export default App;
