import Image from "next/image";
import AnimiranNaslov from "@/app/components/animatedHeader";
import BackButton from "@/app/components/backButton";
import {Calendar , Star } from 'lucide-react';

const url = 'https://api.themoviedb.org/3/movie/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+ process.env.API_KEY
  }
};


export default async function MoviePage({ params }: { params:  Promise<{ movieId: string }> }) {
const movId = (await params).movieId;
const movieDetail = await fetch(url + movId, options).then(res => res.json());

  return (
    <div className="container">
      <BackButton />
     <AnimiranNaslov naslov={movieDetail.title} />
      <div className="movie-detail">
        <Image 
          className="single_image"
          src={"https://image.tmdb.org/t/p/w500" + movieDetail.poster_path}
          alt={movieDetail.title}
          width={500}
          height={750}
        />
        <div className="movie-info">
          <h2>Original title: {movieDetail.original_title}</h2>
          <p><span>Genres:</span> {movieDetail.genres.map((genre: { name: string }) => genre.name).join(', ')}</p>
          <p>{movieDetail.overview}</p>
          <div className="single_detail"><Calendar /> {movieDetail.release_date}</div>
         <div className="single_detail"> <Star /> {movieDetail.vote_average}</div>
        </div>
      </div>
    </div>
  );
}