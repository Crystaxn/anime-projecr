import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
function Popup({imgUrl, synopsis, title, rating, episodes, animeId, setSelectedAnimeId, close, url, streamingName, genres, type, score, aired, status, duration}){
   
    return(<>
    <div className="fixed inset-0 z-10 bg-black opacity-65"></div>
        <div className="fixed bg-gray-950 flex  sm:w-xl w-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col z-20  max-h-[90vh] overflow-y-auto p-4 rounded-lg " style={{
            scrollbarWidth: "none",
            msOverflowStyle: 'none'
        }}>
              <div className="p-4 bg-gray-900 text-white flex flex-col gap-3 rounded-lg">
        <div className="min-h-70 max-h-70 overflow-hidden border-2 border-white rounded-lg ">
            <img src={imgUrl} alt="" className="w-full  " />
            
            </div>
            <button onClick={() => {close(animeId)}} className="bg-neutral-300 text-black fixed right-6 size-15 rounded-lg top-6 text-3xl shadow-neutral-900 shadow-[0_0_15px_rgba(0,0,0,0.5)] ">x</button>
          
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex gap-2 flex-wrap ">
                {genres.map((genre, index) => (
                    <p className="bg-gray-800 text-lg  w-fit pl-2 pr-2 text-gray-300 text-center rounded-2xl flex items-center justify-center " key={index}>{genre.name}</p>
                ))}
                <p className="bg-gray-800 text-lg  w-fit pl-2 pr-2 text-gray-300 text-center rounded-2xl flex items-center justify-center " ><FontAwesomeIcon className="text-yellow-400" icon={faStar}></FontAwesomeIcon>     {Math.trunc(score*10)/10 || "N/A"}</p>
                </div>
                <div className=" gap-2 h-36 flex-wrap grid grid-cols-2 mb-4 sm:mb-0">
                <div className="bg-gray-800 text-lg   w-full p-2 gap-0 text-gray-400  rounded-2xl  flex flex-col justify-around"><p className=" w-full text-left  h-fit text-sm">Type</p><p className="text-white text-lg">{type}</p></div>
                <div className="bg-gray-800 text-lg   p-2 gap-0 text-gray-400  rounded-2xl flex flex-col justify-around flex-wrap">
                    <p className=" w-full text-left  h-fit text-sm">Aired</p>
                    <p className="text-white text-lg break-all whitespace-normal">{aired.string}
                       </p></div>

               
              
                <div className="bg-gray-800 text-lg  w-full p-2 gap-0 text-gray-400  rounded-2xl   flex flex-col justify-around"><p className="text-wrap text-left  h-fit text-sm">Status</p><p className="text-white text-lg">{status}</p></div>
                <div className="bg-gray-800 text-lg   w-full p-2 gap-0 text-gray-400  rounded-2xl   flex flex-col justify-around"><p className="  text-left  h-fit text-sm">Episodes</p><p className="text-white text-lg">{episodes || "Null"}</p></div>
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl">
                    <p className=" ">Synopsis</p>
                <p className="text-sm text-gray-400">{synopsis || "No sypnosis"}</p>
                </div>
                
                <a className="bg-blue-700 p-3 rounded-2xl text-center hover:bg-blue-950 hover:cursor-pointer" href={url}>More Info</a>
            </div>
        </div>
    </>)
}

export default Popup