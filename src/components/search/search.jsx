import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Serach() {
  const [searchMovie, setSearchMovie] = useState(null);
  const [Text, setText] = useState(null);
  const [Type, setType] = useState(null);

  useEffect(() => {
    if (Text != ""  && Text != null && Text != undefined && Text != " " && Text.length > 1 ) {
      fetch(`https://www.omdbapi.com/?apikey=d3e7038e&s=${Text}${Type == ``? null : `&type=${Type}`}`)
        .then((res) => res.json())
        .then((data) => setSearchMovie(data.Search));
    }
  }, [Text, Type]);

  const handleChange = (i) => {
    setInterval(()=>{
        setText(i.target.value);
    },1000)
  };

  const handleChangeSelect = (i)=>{
    i.target.value == "none" ? setType(null): setType(i.target.value)
  }


  const movieSe = searchMovie? searchMovie?.map((item)=>{
    return (
        <Link key={item.imdbID} to={`Movies/${item.imdbID}`}>
        <div className="flex flex-col mb-4 border-b-2">
            <div>
                <img className="rounded-2xl" src={item.Poster} alt="" />
            </div>
            <div className="movie-se--de">
                <h4 className="text-[13px]">{item.Title}</h4>
                <p className="text-[10px]">{item.Year}</p>
            </div>
        </div>
        </Link>
    )
  }): null;

  return (
    <>
      <div className="flex relative">
        <span>🔍</span>
        <input className="bg-slate-800 px-1 border rounded-full w-3/12" onChange={handleChange} type="text" />
        <div className="mx-3">
        <label className="mx-1" htmlFor="type">filter</label>
        <select className="bg-slate-800" onChange={handleChangeSelect} id="type">
        <option value="none">none</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        </div>
        {searchMovie && Text.length > 1? <div className="absolute w-4/12 my-6 bg-slate-800 p-4 border m-2 rounded-2xl overflow-y-scroll h-72">
            {movieSe}
            <div className="page">
            <label htmlFor="page">Page </label>
            <select className="bg-slate-800" id="page">
              <option value="1" className="value">1</option>
              <option value="2" className="value">2</option>
              <option value="3" className="value">3</option>
              <option value="4" className="value">4</option>
              <option value="5" className="value">5</option>
            </select>
            </div>
        </div>:null}
      </div>
    </>
  );
}
