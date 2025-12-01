import Image from "next/image";




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
console.log(movies);


  return (
   <div className="grid">
  {
    movies.results.map((movie: any) => (
      <div className="card" key={movie.id}>
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
        <Image
          className="movie_poster"
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          
        />
        <p>{movie.overview}</p>
      </div>
    ))  
  }
   </div>
  );
}





