import Movie from "../movieCard/card";
import { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import { Link } from "react-router-dom";
import Serach from "../search/search";

export default function Home() {
  const [movie, setmovie] = useState({});
  const [genreSe, setGenre] = useState("none");
  const [typeSe, setType] = useState("none");


  const genreMovie = [
    "none",
    "Action",
"Adventure",
"Animation",
"Biography",
"Comedy",
"Crime",
"Documentary",
"Drama",
"Family",
"Fantasy",
"Film-Noir",
"Game-Show",
"History",
"Horror",
"Mystery",
"News",
"Reality-TV",
"Romance",
"Sci-Fi",
"Short",
"Sport",
"Talk-Show",
"Thriller",
"War",
"Western"
  ]

  const url =
    `https://moviesdatabase.p.rapidapi.com/titles/random?limit=50&list=${typeSe == "movie"?`most_pop_movies`:`most_pop_series`}${genreSe !="none"? `&genre=${genreSe}`:``}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "49c55b43b8msh28b06ea2ac2bd46p1ec444jsn18c36acd1488",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  const fetchMovie = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setmovie(data);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, [genreSe,typeSe]);

  const handleChangeGenre = (i)=>{
    setGenre(i.target.value)
  }
  const handleChangeType = (i)=>{
    setType(i.target.value)
  }


  const movieRes = movie.results;

  return (
    <>
         <Serach/>
         <div className="flex my-3">
         <div className="mx-5">
          <label className="block mb-2 text-sm font-medium text-cyan-50 dark:text-white" htmlFor="genre">Genre</label>
          <select onChange={handleChangeGenre} className="bg-slate-800 border border-gray-300 text-cyan-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="genre" id="genre">
            {genreMovie.map((i)=>{
             return <option key={i} value={i}>{i}</option>
            })}
          </select>
         </div>
         <div className="mx-5">
          <label className="block mb-2 text-sm font-medium text-cyan-50 dark:text-white" htmlFor="genre">Type</label>
          <select onChange={handleChangeType} className="bg-slate-800 border border-gray-300 text-cyan-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="genre" id="genre">
          <option value="none" className="type--option">none</option>
            <option value="movie" className="type--option">Movie</option>
            <option value="series" className="type--option">Series</option>
          </select>
         </div>

         </div>
      <div className="flex flex-row flex-wrap">
        {movieRes? movieRes?.map((x) => (
          <Link className="w-4/12 my-3" key={x.id} to={`Movies/${x.id}`}>
          <Movie
            key={x.id}
            img={x.primaryImage?.url}
            title={x.titleText?.text}
            year={x.releaseYear?.year}
            type={x.titleType?.text}
          />
          </Link>
        )): <h1>Loading...</h1>}
      </div>
    </>
  );
}
