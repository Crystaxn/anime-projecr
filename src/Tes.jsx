import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faGear, faFilter, faStar } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import Filter from "./Filter";
import Settings from "./Settings";
import Loader from "./LoadingScreen";
import Dropdown from "./dropdown";
import Error from "./Error";
import SlideShow from "./slider";
import Pages from "./Pages";
import Copyright from "./Copyright";
function Tailwind() {
  const [anime, setAnime] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState()

  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [allAnime, setAllAnime] = useState([]);


  const [complexFilter, setComplexFilter] = useState(false)
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [selectedTypeOption, setSelectedTypeOption] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenreOption, setSelectedGenreOption] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [maxEpisodes, setMaxEpisodes] = useState(null);
  const [minEpisodes, setMinEpisodes] = useState(null)

  const [showSettings, setShowSettings] = useState(false)

  const [nsfw, setNsfw] = useState(false)
  const [didMount, setDidMount] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState()
  const nsfwGenres = ["Hentai" , "Ecchi"];

  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return;
    }

    let filtered = allAnime;
    
    if (!nsfw) {
      filtered = filtered.filter(anime =>
        Array.isArray(anime.genres) && !anime.genres.some(g => nsfwGenres.includes(g.name))
      );
    }
    if (selectedGenre.length > 0) {
      filtered = filtered.filter(anime =>
        Array.isArray(anime.genres) && anime.genres.some(g => selectedGenre.includes(g.name))
      );
    }

    // Filter by types if selected
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(anime =>
        selectedTypes.includes(anime.type)
      );
    }



    setAnime(filtered);
    setHasSearched(true);

  }, [selectedTypes, selectedGenre, allAnime, didMount, nsfw]);

  useEffect(()=>{
    search()
  },[page])
  function handleNsfw(event) {
    setNsfw(event.target.checked)
  }

  function handleMax(event) {
    const val = event.target.value;
    setMaxEpisodes(val === "" ? null : Number(val));
  }
  function handleMin(event) {
    const val = event.target.value;
    setMinEpisodes(val === "" ? null : Number(val));
  }

  function chosenType(event) {
    const value = event.target.value;
    if (complexFilter === true) {
      setSelectedTypeOption(value);
      if (value && !selectedTypes.includes(value)) {
        setSelectedTypes([...selectedTypes, value]);
      }
    }
    else {
      setSelectedTypes([value])
      setSelectedTypeOption(value);
    }
  }
  function chosenGenre(event) {
    const value = event.target.value;
    if (complexFilter === true) {
      setSelectedGenreOption(value);
      if (value && !selectedGenre.includes(value)) {
        setSelectedGenre([...selectedGenre, value]);
      }
    }
    else {
      setSelectedGenre([value])
      setSelectedGenreOption(value)
    }
  }


  function handleCardPopup(anime) {
    if (selectedAnimeId === anime.mal_id) {
      setSelectedAnimeId(null);
      setSelectedAnime(null);
    }
    else {
      setSelectedAnimeId(anime.mal_id);
      setSelectedAnime(anime);
    }
  }
  function close(animeId) {
    setSelectedAnimeId(null);
    setSelectedAnime(null);
  }
  function handleFilterPopup() {
    setShowFilterPopup(!showFilterPopup)
  }
  function search() {
    setIsLoading(true)
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        searchQuery
      )}&order_by=popularity&limit=24&page=${page}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {

        const filteredTypes = (res.data || []).filter((anime) => {
          const episodes = Number(anime.episodes);
          const hasValidEpisodes = !isNaN(episodes);


          const withinMax =
            maxEpisodes !== null
              ? hasValidEpisodes
                ? episodes <= maxEpisodes
                : true
              : true;

          const withinMin =
            minEpisodes !== null
              ? hasValidEpisodes
                ? episodes >= minEpisodes
                : true
              : true;


          return withinMax && withinMin;



        })

        setAnime(filteredTypes)
        setAllAnime(filteredTypes)
        setIsLoading(false)
        setHasSearched(true)
        console.log(filteredTypes)
        console.log(selectedTypes)
        console.log(res)
        setLastPage(res.pagination.last_visible_page
        )
        console.log(page)


      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      });


  }
  function validateAndSearch() {
    if (!searchQuery || searchQuery.trim().length <= 3) {
      setError('Please enter at least 3 characters for the search.');

      return; // Stop here
    }
    setError('');
    setShow(true); 
    setPage(1)// Clear any previous error
    search();
    console.log(error)

  }

  return (<>
  <div>
    <div className="min-h-screen bg-stone-950 pb-5">
      <div className="bg-gray-950 flex justify-between shadow-2xs p-3 text-white border-b-1 border-b-white items-center fixed right-0 left-0 z-10"  >
        <div className="flex items-center">
          <Dropdown anime={anime} setAnime={setAnime} setShow={setShow} setAllAnime={setAllAnime} setIsLoading={setIsLoading}></Dropdown>
          

          <div className="text-3xl sm:block hidden">Crystaxn</div>
        </div>
        
        {error.length > 0 && (<div >ggg</div>)}


        <div className="flex text-2xl  ">
          {show && (<>
            <div className="flex border-2 overflow-hidden rounded-2xl mr-10" >
              <input type="text" className="text-lg sm:w-sm  w-fit " value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="bg-stone-800 text-white  flex p-2  hover:bg-stone-400 hover:cursor-pointer " onClick={() => { validateAndSearch(); setPage(1)}}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </div>
          </>)}

          


        </div>
      </div>
      {isLoading && (<Loader></Loader>)}
      {show === false && (<>
        <div className=" sm:items-center flex flex-col h-fit pt-40 gap-10 pb-4 bg-stone-900">
          <h1 className="text-neutral-200 text-shadow-neutral-500 text-shadow-sm text-7xl font-bold mx-4">anime project.</h1>
          <div className="w-fit flex border-2 overflow-hidden rounded-2xl mr-10 text-white mx-4" >
            <input type="text" className="text-lg sm:w-lg w-4xs bg-neutral-950 text-left pl-2" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for an anime!"/>
            <button className="bg-stone-800 text-white  flex  h-12 hover:bg-stone-400 hover:cursor-pointer items-center w-15 justify-center" onClick={() => { validateAndSearch() }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          </div>
        </div>
        <div className="h-20 bg-gradient-to-b from-stone-900 to-stone-950">

        </div>
        <div className="text-white flex flex-col gap-20 bg-stone-950">
          <div>
            <h1 className="text-5xl font-bold sm:ml-16 mb-3 ml-5">Top Anime</h1>
            <SlideShow type={"top"} handleCardPopup={handleCardPopup}></SlideShow>
          </div>
          


        </div>
      </>)}


      {anime.length > 0 && (<>
        {show && (<>
          <div className="w-full pt-20">

            <div className="w-fit m-auto">
              <div className="flex gap-2 ">

                <div className="w-full">
                  
                  <div className="hover:bg-neutral-700 rounded-2xl mb-2 hover:cursor-pointer w-fit p-2">
                  <button className="z-50 text-white text-xl hover:cursor-pointer" onClick={() => { handleFilterPopup(); setComplexFilter(true) }}><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>Filter</button>
                  </div>
                  <div className="flex  gap-2">
                    <div className="flex gap-2 justify-between w-full h-10">
                      <div className="flex gap-2">
                        <div className="flex mb-2">
                          <select className="bg-neutral-100 p-1 text-neutral-900 rounded-xl text-lg w-20" value={selectedGenreOption} onChange={chosenGenre}>Genre
                            <option value="" disabled hidden>Genre</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Avant Garde">Avant Garde</option>
                            <option value="Award Winning">Award Winning</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Horror">Horror</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Slice of Life">Slice of Life</option>
                            <option value="Sports">Sports</option>
                            <option value="Supernatural">Supernatural</option>
                            <option value="Suspense">Suspense</option>

                          </select>



                        </div>
                        <div className="flex mb-2 ">
                          <select className="bg-neutral-100 text-neutral-900 p-1 rounded-xl text-lg" value={selectedTypeOption} onChange={chosenType}>+ Add type
                            <option value="" hidden>Add type</option>
                            <option value="TV">TV</option>
                            <option value="TV_SHORT">TV_SHORT</option>
                            <option value="MOVIE">MOVIE</option>
                            <option value="SPECIAL">SPECIAL</option>
                            <option value="OVA">OVA</option>
                            <option value="ONA">ONA</option>
                          </select>



                        </div>
                        <p className=" text-white text-xl sm:block hidden">Searched for: {searchQuery} <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></p>
                      </div>
                      




                    
                    <div className="flex items-center text-white gap-2">
                      <p className="text-2xl font-bold">{nsfw ? "Nsfw" : "Sfw"}</p>
                      <label for="checkbox" class="relative inline-block w-16 h-8 cursor-pointer">
                        <input id="checkbox" type="checkbox" class="hidden peer" onChange={handleNsfw} />


                        <div class="absolute inset-0 rounded-full border-2 border-white transition-transform peer-hover:rotate-x-2 peer-hover:rotate-y-2"></div>


                        <div class="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-300 peer-checked:left-9"></div>
                      </label>

                    </div>
                    </div>
                    
                  </div>
                  <p className=" text-white text-xl sm:hidden block">Searched for: {searchQuery} <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></p>
                </div>
              </div>
              <div className=" xl:grid-cols-3 xl:gap-x-20 grid md:gap-x-3 gap-y-2 xl:w-6xl sm:justify-self-center md:w:5xl md:grid-cols-2 sm:pl-0 pl-3 sm:grid-cols-2 grid-cols-1" >
                

                {anime.map((results) => {
                  // Default to empty string if synopsis is null or undefined
                  const title = results.title || "";

                  
                  return (
                    <div key={results.mal_id} className="flex bg-gray-950 md:w-96 w-80 p-2 md:h-52 h-44  overflow-hidden rounded-lg hover:transform hover:scale-105 transition ease-in-out shadow-md shadow-black hover:shadow-2xs " onClick={() => { handleCardPopup(results) }}>
                      <img className="m-0 p-0 min-w-36" src={results.images.jpg.image_url} alt="" />
                      <div className=" bg-gray-900 ml-2 p-2 rounded-2xl flex flex-col justify-between w-full">
                        
                          <div className="flex justify-between items-start w-full">
                        
                        <div className="text-white font-bold text-xl line-clamp-2 p-0 m-0 w-fit">
                          {results.title_english === null ? results.title : results.title_english}
                        </div>
                        {Array.isArray(results.genres) && results.genres.some(g => nsfwGenres.includes(g.name)) &&(<><div className="bg-pink-500 text-white px-2 rounded-2xl flex items-center h-fit ">Nsfw</div></>)}
                        </div>
                        <div className="w-fit">
                        
                        <p className={`text-gray-400 md:line-clamp-3 line-clamp-2`}>
                          {results.synopsis}
                        </p>
                        </div>
                        <div className="flex justify-end flex-col ">
                        <div className="flex justify-between">
                        <div className="bg-blue-600 text-white w-fit p-0.5 rounded-2xl px-2 max-h-7 ">{results.aired?.from ? results.aired.from.slice(0, 4) : "No info"}</div>
                        <p className="bg-gray-800 text-lg  w-fit pl-2 pr-2 text-gray-300 text-center rounded-2xl flex items-center justify-center " ><FontAwesomeIcon className="text-yellow-400" icon={faStar}></FontAwesomeIcon>     {Math.trunc(results.score*10)/10 || "?"}</p>
                        </div>
                        </div>
                    
                      
                      </div>
                     

                    </div>
                  );
                })}

              </div>
              <Pages setPageFetch={setPage} lastPage={lastPage} ></Pages>
            </div>
          </div>
        </>)}
      </>)}
    

      {anime.length === 0 && hasSearched && !isLoading && show && (<>
        <div className="pt-20 pl-20">
          <button className="z-50 text-white text-xl" onClick={() => { handleFilterPopup(); setComplexFilter(true) }}><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>Filter</button>
          <div className="flex gap-2">
            <div className="flex mb-2">
              <select className="bg-neutral-100 p-1 text-neutral-900 rounded-xl text-lg" value={selectedGenreOption} onChange={chosenGenre}>
                <option value="" hidden>Add Genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Avant Garde">Avant Garde</option>
                <option value="Award Winning">Award Winning</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Sports">Sports</option>
                <option value="Supernatural">Supernatural</option>
                <option value="Suspense">Suspense</option>

              </select>



            </div>
            <div className="flex mb-2">
              <select className="bg-neutral-100 text-neutral-900 p-1 rounded-xl text-lg" value={selectedTypeOption} onChange={chosenType}>+ Add type
                <option value="" hidden>Add type</option>
                <option value="TV">TV</option>
                <option value="TV_SHORT">TV_SHORT</option>
                <option value="MOVIE">MOVIE</option>
                <option value="SPECIAL">SPECIAL</option>
                <option value="OVA">OVA</option>
                <option value="ONA">ONA</option>
              </select>



            </div>
            <p className=" text-white text-xl">Searched for: {searchQuery} <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></p>
          </div>
          <p className="text-2xl text-white m-5">No results found.</p>
        </div>
    


      </>)}
      {showFilterPopup && (
        <Filter
          handleFilterPopup={handleFilterPopup}
          selectedTypes={selectedTypes}
          selectedTypeOption={selectedTypeOption}
          setSelectedTypes={setSelectedTypes}
          selectedGenre={selectedGenre}
          selectedGenreOption={selectedGenreOption}
          setSelectedGenre={setSelectedGenre}
          chosenGenre={chosenGenre}
          chosenType={chosenType}
          search={search}
          maxEpisodes={maxEpisodes}
          minEpisodes={minEpisodes}
          handleMax={handleMax}
          handleMin={handleMin}
          setComplexFilter={setComplexFilter}
        ></Filter>)}

      {error.length > 0 && (<Error error={error}
        setError={setError}></Error>)}
      {selectedAnime && (
        <Popup
          imgUrl={selectedAnime.images.jpg.large_image_url}
          synopsis={selectedAnime.synopsis}
          title={selectedAnime.title_english || selectedAnime.title}
          rating={selectedAnime.rating}
          episodes={selectedAnime.episodes}
          animeId={selectedAnimeId}
          close={close}
          setSelectedAnimeId={setSelectedAnimeId}
          genres={selectedAnime.genres}
          type={selectedAnime.type}
          score={selectedAnime.score}
          aired={selectedAnime.aired}
          status={selectedAnime.status}
          duration={selectedAnime.duration}
          url={selectedAnime.url}
        ></Popup>

      )}
      {showSettings && (<>
        <Settings></Settings>
      </>)}

    </div>
    <Copyright></Copyright>
    </div>
  </>)
}
export default Tailwind