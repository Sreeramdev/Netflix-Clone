import React,{useEffect, useRef, useState} from 'react'
import "./TitleCards.css"
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTdjM2Q3YWFjNTRkZDY3N2FmNTAzMmE0YTZlMDZlOSIsInN1YiI6IjY2NmUxNzUxZGM2ZTQ1Mjc2MmVlYTljYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m3FtT_mCmxKTg2pjycdl8_gQt-EODM8oriaO1BJQRE4'
    }
  };
  
  

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='title-Cards'>
     <h2>{title?title:"Popular on Netflix"}</h2>
     <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index)=>{
        return <div className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
          
         </div>
        
      })}
     </div>
    </div>
  )
}

export default TitleCards