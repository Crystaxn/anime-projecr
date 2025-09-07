import React, {useState} from "react"

function Pages({setPageFetch, lastPage}){
    const [page, setPage] = useState(3)
    const [selectedPage, setSelectedPage] = useState(1)
    

    function pageHandler(event){
        let pagee = parseInt(event.target.textContent)
        setSelectedPage(pagee)
        setPageFetch(pagee)
    
        console.log(pagee)
        if(pagee == page + 1 && pagee < lastPage -1){
            setPage(page + 1)
        }
        else if(pagee == page - 1 && pagee > 2){
            setPage(page - 1)
            console.log("hshsh")
        }
        else if(pagee == page + 2 ){
            if(pagee == lastPage -1){
                setPage(page + 1)
            }
            else if(pagee == lastPage ){
                return
            }
            else{setPage(page + 2)}   
        }
        else if(pagee == page - 2 && pagee > 2){
            setPage(page - 2)
        }

        
       
    }
    function prevPage(){
        if (selectedPage > 1) {
            const newSelectedPage = selectedPage - 1;
            setSelectedPage(newSelectedPage);
            setPageFetch(newSelectedPage);
            if (newSelectedPage <= page - 1 && page > 3) {
                setPage(page - 1);}
        }
            
        
    }
    function nextPage(){
        if (selectedPage < lastPage) {
            const newSelectedPage = selectedPage + 1;
            setSelectedPage(newSelectedPage);
            setPageFetch(newSelectedPage);
            if (newSelectedPage <= page + 1 && page < lastPage - 1) {
                setPage(page + 1);}
        }
    }
    return(<>
        <div className="flex justify-center gap-2 mt-5">
        <button className="bg-white sm:size-10 size-7 font-bold flex items-center justify-center rounded-full" onClick={() => {prevPage()}}>{"<"}</button>
            <button className=" sm:size-10 size-7 font-bold flex items-center justify-center rounded-full" style={{backgroundColor: page - 2 == selectedPage ? "black" : "white",
              border: page - 2 == selectedPage ? "1px solid white" : "none",
              color: page - 2 == selectedPage ? "white" : "black"
            }} onClick={(event)=>{pageHandler(event)}}>{page - 2}</button>
            <button className=" sm:size-10 size-7 font-bold  items-center justify-center rounded-full" style={{backgroundColor: page - 1 == selectedPage ? "black" : "white",
              border: page - 1 == selectedPage ? "1px solid white" : "none",
              color: page - 1 == selectedPage ? "white" : "black",
              display: lastPage >= 2 ? "flex" : "none"
            }} onClick={(event)=>{pageHandler(event)}}>{page - 1}</button>
            <button className=" sm:size-10 size-7 font-bold  items-center justify-center rounded-full" style={{backgroundColor: page  == selectedPage ? "black" : "white",
              border: page  == selectedPage ? "1px solid white" : "none",
              color: page  == selectedPage ? "white" : "black",
              display: lastPage >= 3 ? "flex" : "none"
            }} onClick={(event)=>{pageHandler(event)}}>{page}</button>
            <button className=" sm:size-10 size-7 font-bold items-center justify-center rounded-full" style={{backgroundColor: page + 1== selectedPage ? "black" : "white",
              border: page + 1 == selectedPage ? "1px solid white" : "none",
              color: page + 1 == selectedPage ? "white" : "black",
              display: lastPage >= 4 ? "flex" : "none"
            }} onClick={(event)=>{pageHandler(event)}}>{page + 1}</button>
            <button className=" sm:size-10 size-7 font-bold  items-center justify-center rounded-full" style={{backgroundColor: page + 2 == selectedPage ? "black" : "white",
              border: page + 2 == selectedPage ? "1px solid white" : "none",
              color: page + 2 == selectedPage ? "white" : "black",
              display: lastPage >= 5 ? "flex" : "none"
            }} onClick={(event)=>{pageHandler(event)}}>{page + 2}</button>
            <button className="bg-white sm:size-10 size-7 font-bold flex items-center justify-center rounded-full" onClick={() => {nextPage()}}>{">"}</button>
        </div>
    </>)
}
export default Pages