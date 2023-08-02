import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../Spinner'

import GetUser from "../GetUser";
import Login from "./Login";
import GetArtists from "../GetArtists";
import GetSongs from "../GetSongs";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'

export default class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      width: window.innerWidth
    }
  }  
  
  componentDidMount() {
    const code = this.props.code
    window.addEventListener('resize', () => {
      if (window.innerWidth !== this.state.width) {
        this.setState({width: window.innerWidth})
      }
    })
    // if token is not in local storage, make a call to server to get token
    if (!localStorage.getItem('access_token')) {
      try {
        axios.post('/api/token', {
          code
        })
        .then(response => {
          const { accessToken, refreshToken } = response.data
          
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('refresh_token', refreshToken)          

          this.setState({token: accessToken})
          // if (localStorage.getItem('access_token')) { localStorage.removeItem('code') } 
          return this.state.token
        })   
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  render() {
    const token = localStorage.getItem('access_token')
    return (
      token ? 
      <div className="pt-5">
        <GetUser />
        <Login isLoggedIn={true} />
        <div className="d-flex flex-column flex-md-row justify-content-center gap-5 p-md-1 pb-0 text-white">
          <Container fluid className='px-4 px-lg-2'>
            <Row className='d-flex justify-content-evenly'>
            <Col md={5} className='p-md-0'>
              <div>
                <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: "2rem" }}>
                  <h2 className="fw-bold fs-3">{this.state.width < 992 ? 'Top Artists' : 'Your Top Artists'}</h2>
                    <Link to="/artists">
                      <Button variant='outline-white' className='dash-btn rounded-pill fs-6 py-2 px-4'>See more</Button>
                    </Link>
                </div>
                <GetArtists />
              </div>
            </Col>
            <Col md={5} className='p-md-0'>
              <div>
                <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: "2rem" }}>
                  <h2 className="fw-bold fs-3">{this.state.width < 992 ? 'Top Songs' : 'Your Top Songs'}</h2>
                  <Link to="/songs">
                  <Button variant='outline-white' className='dash-btn rounded-pill fs-6 py-2 px-4'>See more</Button>
                  </Link>
                </div>
                <GetSongs />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    : <Spinner />
    )}}
