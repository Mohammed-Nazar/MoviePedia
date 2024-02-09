import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Det() {
  const param = useParams();
  const [movieDet, setmovieDet] = useState(null);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=d3e7038e&i=${param.id}`)
      .then((res) => res.json())
      .then((data) => setmovieDet(data));
  }, [lang]);

  useEffect(() => {
    const fetchArr = [
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Plot}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Type}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Genre}`
      ),

      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Actors}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Awards}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Country}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Language}`
      ),
    ];
    if (lang == "ar") {
      Promise.all(fetchArr).then((res) => {
        Promise.all(
          res.map((item) => {
            return item.json();
          })
        ).then((data) => {
          console.log(data)
          const secondDe = data[0][0][1] ? data[0][0][1][0]: "";
          const thirdDe = data[0][0][2] ? data[0][0][2][0]: "";
          setmovieDet({
            ...movieDet,
            Plot: data[0][0][0][0] + secondDe+ thirdDe,
            Type: data[1][0][0][0],
            Genre: data[2][0][0][0],
            Actors: data[3][0][0][0],
            Awards: data[4][0][0][0],
            Country: data[5][0][0][0],
            Language: data[6][0][0][0],
          });
        });
      });
    }
  }, [lang]);

  const handleChange = (i) => {
    setLang(i.target.value);
  };

  const movieEl = movieDet ? (
    lang == "en" ? (
      <>
        <div className="flex flex-col mx-2">
          <div className="movie--Img">
            <img className="w-9/12 rounded-3xl mx-auto my-4" src={movieDet.Poster} alt="null" />
          </div>
          <div className="mb-3 text-center font-bold">
            <h1 className="text-2xl">{movieDet.Title}</h1>
            <p >{movieDet.Year}</p>
          </div>
          <p className="font-semibold mb-2">{movieDet.Plot}</p>
          <ul className="movie--det">
            <li>
              <span className="font-bold">Type:</span> {movieDet.Type}
            </li>
            <li>
            <span className="font-bold">Genre: </span>{movieDet.Genre}
            </li>
            <li>
            <span className="font-bold">Rating: </span>{movieDet.imdbRating}
            </li>
            <li>
            <span className="font-bold">Awards: </span>{movieDet.Awards}
            </li>
            <li>
            <span className="font-bold">Actors: </span> {movieDet.Actors}
            </li>
            <li>
            <span className="font-bold">Released: </span>{movieDet.Released}
            </li>
            <li>
            <span className="font-bold">Country: </span>{movieDet.Country}
            </li>
            <li>
            <span className="font-bold">Language: </span>{movieDet.Language}
            </li>
            {movieDet.Type.toLowerCase() == "series" ? (
              movieDet.totalSeasons != "N/A" ? (
                <li>
                 <span className="font-bold">Total Seasons: </span>{movieDet.totalSeasons}
                </li>
              ) : null
            ) : null}
          </ul>
        </div>
      </>
    ) : (
      <>
        <div dir="rtl" className="flex flex-col mx-2">
          <div className="movie--Img">
            <img className="w-9/12 rounded-3xl mx-auto my-4" src={movieDet.Poster} alt="null" />
          </div>
          <div className="mb-3 text-center font-bold">
            <h1 className="text-2xl">{movieDet.Title}</h1>
            <p>{movieDet.Year}</p>
          </div>
          <p className="font-semibold mb-2">{movieDet.Plot}</p>
          <ul className="movie--det">
            <li>
              <span className="font-bold">النوع: </span>{movieDet.Type}
            </li>
            <li>
             <span className="font-bold"> التصنيف:</span> <span>{movieDet.Genre}</span>
            </li>
            <li>
              <span className="font-bold"> التقييم:</span> <span>{movieDet.imdbRating}</span>
            </li>
            <li>
              <span className="font-bold"> الجوائز: </span> <span>{movieDet.Awards}</span>
            </li>
            <li>
             <span className="font-bold"> الممثلين:</span> <span>{movieDet.Actors}</span>
            </li>
            <li>
              <span className="font-bold">الاصدار: </span><span>{movieDet.Released}</span>
            </li>
            <li>
              <span className="font-bold">الدولة: </span><span>{movieDet.Country}</span>
            </li>
            <li>
              <span className="font-bold">اللغات: </span><span>{movieDet.Language}</span>
            </li>
            {movieDet.Type.toLowerCase() == "series" ? (
              movieDet.totalSeasons != "N/A" ? (
                <li>
                  <span className="font-bold">عدد المواسم: </span><span>{movieDet.totalSeasons}</span>
                </li>
              ) : null
            ) : null}
          </ul>
        </div>
      </>
    )
  ) : (
    <>
      <h2>Loading...</h2>
    </>
  );
  return (
    <>
      {movieEl}
      <div className="my-4">
        <label className="mr-2" htmlFor="lang">Language</label>
        <select className="bg-slate-800" onChange={handleChange} id="lang">
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </>
  );
}
