import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTiktok, faWhatsapp, faGithub } from "@fortawesome/free-brands-svg-icons"

function Copyright() {
    return (<>
        <div className="bg-neutral-900 w-full text-white  flex p-3 flex-col gap-2 ">
            <p className="text-2xl  w-fit">anime project.</p>
            <div className="text-white flex text-xl gap-2">
                <a href="https://github.com/Crystaxn">
                <FontAwesomeIcon icon={faGithub} className="border-1 border-white p-2 rounded-2xl hover:bg-neutral-600 hover:cursor-pointer"></FontAwesomeIcon>
                </a>
                <a href="https://www.tiktok.com/@kerpika1">
                <FontAwesomeIcon icon={faTiktok} className="border-1 border-white p-2 rounded-2xl hover:bg-neutral-600 hover:cursor-pointer"></FontAwesomeIcon>
                </a>
                <a href="https://wa.me/6283181811541">
                <FontAwesomeIcon icon={faWhatsapp} className="border-1 border-white p-2 rounded-2xl hover:bg-neutral-600 hover:cursor-pointer"></FontAwesomeIcon>
                </a>
            </div> 
            </div>
    </>)
}

export default Copyright