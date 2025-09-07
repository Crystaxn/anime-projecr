import React, { useState, useEffect} from 'react';


function SlideShow({type, handleCardPopup}){
  
  const [current, setCurrent] = useState(0);
  const [topAnime, setTopAnime] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchAnime();
}, []);

 

const fetchAnime = async () => {
  setLoading(true);
  setError(null);

  let url;
  if (type === 'top') {
    url = `https://api.jikan.moe/v4/top/anime?limit=9`;
  } else if (type === 'ongoing') {
    url = `https://api.jikan.moe/v4/seasons/now`;
  } else if (type === 'upcoming') {
    url = `https://api.jikan.moe/v4/seasons/upcoming`;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();

   

    

    setTopAnime(json.data);
    setCurrent(0); // reset slider
  } catch (err) {
    console.error(err);
    setTopAnime([]); // prevent crash
    setError("Failed to load anime data. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + (topAnime.length -2 )) % (topAnime.length -2 ));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % (topAnime.length -2 ));
  };
 
  return (
    <div className="w-full flex flex-col items-center justify-center">
        <div className='flex items-center'>
       
        
       
       
      <div className=" xl:grid-cols-3 xl:gap-x-20 grid md:gap-x-3 gap-y-2 xl:w-6xl justify-self-center md:w:5xl md:grid-cols-2 grid-cols-1" >

          
        
          {topAnime.map((results) => {
                  // Default to empty string if synopsis is null or undefined
                  

                  
                  return (
                    <div key={results.mal_id} className="flex bg-gray-950 w-96 p-2 h-52 overflow-hidden rounded-lg hover:transform hover:scale-105 transition ease-in-out shadow-md shadow-black hover:shadow-2xs" onClick={() => { handleCardPopup(results) }}>
                      <img className="m-0 p-0 w-36" src={results.images.jpg.image_url} alt="" />
                      <div className=" bg-gray-900 ml-2 p-2 rounded-2xl flex flex-col justify-between">
                        <div className="flex flex-col justify-between h-auto">
                        <p className="text-white font-bold text-xl line-clamp-2">
                          {results.title_english === null ? results.title : results.title_english}
                        </p>
                        <p className={`text-gray-400 line-clamp-3`}>
                          {results.synopsis}
                        </p>
                        </div>
                        <div className="flex justify-between">
                        <div className="bg-blue-600 text-white w-fit p-0.5 rounded-2xl px-2">{results.aired?.from ? results.aired.from.slice(0, 4) : "No info"}</div>
                       
                      </div>
                      </div>
                     

                    </div>
                  );
                })}
        </div>
     
      </div>

    
    </div>
  );
};

export default SlideShow;
