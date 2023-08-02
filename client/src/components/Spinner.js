import React from 'react'
import { Bars } from 'react-loader-spinner'

const Spinner = () => {
  return (
        <Bars 
            height={50}
            width={50}
            color='#4fa94d'
            ariaLabel='bars-loading'
            wrapperStyle={{height: '500px'}}
            wrapperClass='w-100 d-flex justify-content-center align-items-center'
            visible={true}
        />
  )
}

export default Spinner