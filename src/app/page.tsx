import Image from "next/image";
import Search from "./components/search";
import Link from "next/link";
import AnimiranNaslov from "./components/animatedHeader";




const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+ process.env.API_KEY
  }
};




export default async function Home() {
let response = await fetch(url, options);
let movies = await response.json();


  return (
    <>
    <div className="container">
      <Search />
    <AnimiranNaslov />
   <div className="grid">
  {
    movies.results.map((movie: any) => (
      <Link href={"/movie/" + movie.id} key={movie.id}>
      <div className="card" key={movie.id}>
        <p>{movie.id}</p>
            <Image
          className="movie_poster"
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
          fill={true}
        />
        <div className="movie_details">
        <h2>{movie.title}</h2>
        <p className="info">Release Date: {movie.release_date}</p>
        </div>
      </div>
      </Link>
    ))  
  }
   </div>
   </div>
   </>
  );
}





