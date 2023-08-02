import React, { useState } from 'react'

const Pagination = ({ songsPerPage, totalSongs, paginate }) => {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalSongs / songsPerPage); i++) {
        pageNumbers.push(i)
    }

    // state for changing the active page number
    const [activePage, setActivePage] = useState(pageNumbers[0])


    // function to scroll to top when pagination button is pressed
    const scrolltotop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

  return (
        <nav>
            <ul className='pagination fs-4 d-flex justify-content-center gap-5 text-white'>
                <li role='button' 
                    className='pe-none'
                     onClick={() => { 
                        if(activePage <= pageNumbers[0]) return; 
                        setActivePage(page => page - 1); 
                        paginate(activePage - 1)}}
                        scrollToTop>
                        <div className={activePage === pageNumbers[0] ? 'user-select-none text-muted' : 'pe-auto user-select-none'} onClick={scrolltotop}>
                            ❮
                        </div>
                </li>
                <li>
                    {activePage}
                </li>
                 <li role='button'
                    className='pe-none'
                     onClick={() => { 
                        if(activePage >= pageNumbers[pageNumbers.length - 1]) return; 
                        setActivePage(page => page + 1); 
                        paginate(activePage + 1)}}>
                        <div className={activePage === pageNumbers[pageNumbers.length - 1] ? 'user-select-none text-muted' : 'pe-auto user-select-none'} onClick={scrolltotop}>
                            ❯
                        </div>
                </li>
            </ul>
        </nav>
  )
}

export default Pagination