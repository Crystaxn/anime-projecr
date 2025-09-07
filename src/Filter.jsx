import React, { useState } from "react"

function Filter({ handleFilterPopup, selectedTypes, setSelectedTypes, selectedTypeOption, chosenType, selectedGenre, setSelectedGenre, selectedGenreOption, chosenGenre, search, maxEpisodes, minEpisodes, handleMax, handleMin, setComplexFilter }) {





    return (<>
        <div className="fixed inset-0 z-10 bg-black opacity-65"></div>
        <div className="p-2 bg-gray-950 sm:w-2xl w-xs z-10 fixed h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">

            <div className=" bg-gray-950 z-10 text-white text-xl font-bold ">
                <div className="flex justify-between bg-gray-950 items-center m-2">
                    <p className="text-3xl m-1">Filter</p>
                    <button onClick={() => { handleFilterPopup(); setComplexFilter(false) }} className="text-3xl">✖</button>
                </div>
                <div className="p-2 bg-gray-900 ">
                    <div className="mb-10">
                        <div className=" w-3xs pb-2 font-bold text-2xl">Type</div>
                        <div className="flex mb-2">
                            <select className="bg-stone-800 p-1 rounded-xl text-lg" value={selectedTypeOption} onChange={chosenType}>+ Add type
                                <option value="" hidden>Add type</option>
                                <option value="TV">TV</option>
                                <option value="TV_SHORT">TV_SHORT</option>
                                <option value="MOVIE">MOVIE</option>
                                <option value="SPECIAL">SPECIAL</option>
                                <option value="OVA">OVA</option>
                                <option value="ONA">ONA</option>
                            </select>



                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTypes.map((types, index) => {
                                return (<><div key={index} className="h-fit w-fit  flex" >
                                    <div className="bg-gray-800 text-lg  min-w-24 text-gray-400 text-center rounded-l-2xl flex items-center justify-center"> {types}</div>
                                    <button onClick={() => { setSelectedTypes(selectedTypes.filter((_, i) => i !== index)) }} className="text-center bg-gray-800 w-6 pr-2 rounded-r-2xl h-8">x</button></div></>)
                            })}
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className=" w-3xs pb-2 font-bold text-2xl">Genre</div>
                        <div className="flex mb-2">
                            <select className="bg-stone-800 p-1 rounded-xl text-lg" value={selectedGenreOption} onChange={chosenGenre}>+ Add Genre
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
                        <div className="flex flex-wrap gap-2">
                            {selectedGenre.map((genres, index) => {
                                return (<><div key={index} className="h-fit w-fit  flex" >
                                    <div className="bg-gray-800 text-lg  min-w-24 text-gray-400 text-center rounded-l-2xl flex items-center justify-center"> {genres}</div>
                                    <button onClick={() => { setSelectedGenre(selectedGenre.filter((_, i) => i !== index)) }} className="text-center bg-gray-800 w-6 pr-2 rounded-r-2xl h-8">x</button></div></>)
                            })}
                        </div>
                    </div>

                    <div>
                        <div className="font-bold text-2xl mb-2">Episodes</div>
                        <div className="flex gap-3 flex-wrap">
                            <div>
                                <p>Min</p>
                                <input type="number" className="bg-gray-800" onChange={handleMin} value={minEpisodes} />
                            </div>
                            <div>
                                <p>Max</p>
                                <input type="number" className="bg-gray-800" onChange={handleMax} value={maxEpisodes} />
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Filter