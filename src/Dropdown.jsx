import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useRef, useEffect } from "react"
function Dropdown({ setAnime, anime, setShow, setSelectedGenre, setAllAnime, setIsLoading}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showTypes, setShowTypes] = useState(false)
  const [showGenres, setShowGenres] = useState(false)
 
  
  
  function handleGenre(event) {
    const value = event.target.value;
    
    fetchGenreAnime(value)
  };
  function handleType(event) {
    const value = event.target.value;
    
    fetchTypeAnime(value)
  };
  

  async function fetchTopUpcomingAnime() {
    setIsLoading(true)
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=upcoming');
      const result = await response.json();
      setAnime(result.data); // Set data into state
      setAllAnime(result.data)
      console.log(result.data)
      setIsLoading(false)

    } catch (error) {

      console.error(error);
    } finally {

    }
  }
  async function fetchTypeAnime(type) {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?type=${type}`);
      const result = await response.json();
      setAnime(result.data); // Set data into state
      setAllAnime(result.data)
      console.log(result.data)
      setIsLoading(false)

    } catch (error) {

      console.error(error);
    } finally {

    }
  }
  async function fetchGenreAnime(genreId) {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}`);
      const result = await response.json();
       // Set data into state
      console.log(result.data)
      setAllAnime(result.data)
      setAnime(result.data);
      setIsLoading(false)

    } catch (error) {

      console.error(error);
    } finally {

    }
  }
  async function fetchOngoingAnime() {
    setIsLoading(true)
    try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now');
      const result = await response.json();
      setAllAnime(result.data)
      setAnime(result.data); // Set data into state
      console.log(result.data)
      setIsLoading(false)

    } catch (error) {

      console.error(error);
    } finally {

    }
  }


  return (
    <div className=" relative inline-block" onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}>
      <div className="flex">
        <button className="text-2xl p-2">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0  z-10">
          <div className="flex flex-col items-start bg-neutral-800  rounded-2xl w-36 shadow-lg ">
            {/* Types with submenu */}
            <div
              className="relative w-full"
              onMouseEnter={() => setShowTypes(true)}
              onMouseLeave={() => setShowTypes(false)}
            >
              <button className="p-2 hover:bg-gray-700 w-full text-left">Types</button>

              {showTypes && (
                <div className="absolute top-0 left-full  bg-gray-800 rounded-2xl  shadow-md w-40 z-20">
                  <button value="TV" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>TV</button>
<button value="TV_SHORT" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>TV_SHORT</button>
<button value="MOVIE" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>MOVIE</button>
<button value="SPECIAL" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>SPECIAL</button>
<button value="OVA" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>OVA</button>
<button value="ONA" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleType(event); setShow(true)}}>ONA</button>

                </div>
              )}
              {showGenres && (<>
                <div className="absolute top-0 left-full  bg-gray-800 rounded-2xl  shadow-md w-40 z-20 " onMouseEnter={() => setShowGenres(true)}
                  onMouseLeave={() => setShowGenres(false)}>
                  <button value="2" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Adventure</button>
                  <button value="5" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Avant Garde</button>
                  <button value="46" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Award Winning</button>
                  <button value="4" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Comedy</button>
                  <button value="8" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Drama</button>
                  <button value="10" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Fantasy</button>
                  <button value="14" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Horror</button>
                  <button value="7" className="p-2 hover:bg-gray-700 w-full text-left"onClick={(event) => {handleGenre(event); setShow(true)}}>Mystery</button>
                  <button value="22" className="p-2 hover:bg-gray-700 w-full text-left"onClick={(event) => {handleGenre(event); setShow(true)}}>Romance</button>
                  <button value="24" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Sci-Fi</button>
                  <button value="36" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Slice of Life</button>
                  <button value="30" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Sports</button>
                  <button value="37" className="p-2 hover:bg-gray-700 w-full text-left"onClick={(event) => {handleGenre(event); setShow(true)}}>Supernatural</button>
                  <button value="41" className="p-2 hover:bg-gray-700 w-full text-left" onClick={(event) => {handleGenre(event); setShow(true)}}>Suspense</button>

                </div>
              </>)}
            </div>

            {/* Other Buttons */}
            <div
              className="relative w-full"
              onMouseEnter={() => setShowGenres(true)}
              onMouseLeave={() => setShowGenres(false)}
            >
              <button className="p-2 hover:bg-gray-700 w-full text-left">Genres</button>

            </div>
            <button className="p-2 hover:bg-gray-700 w-full text-left" onClick={() => { fetchOngoingAnime(); setShow(true) }}>Ongoing</button>
            <button
              className="p-2 hover:bg-gray-700 w-full text-left"
              onClick={() => { fetchTopUpcomingAnime(); setShow(true) }}
            >
              Upcoming
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown