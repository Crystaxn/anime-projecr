import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function Error({error, setError}){
    return(<>
        <div className="bg-gray-950 text-white fixed  flex  w-xl  left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col z-20 fade-in-up bottom-10 p-2 rounded-2xl shadow-neutral-900 shadow-2xl" onAnimationEnd={() => {setError('')}}>
            <div className="flex text-red-500 items-center">
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            <p>Error</p>
            </div>
            <div className="bg-gray-900 p-2 rounded-2xl">
            <p>{error}</p>
            </div>

        </div>
    </>)
}

export default Error