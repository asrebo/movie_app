"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';


export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //pocakaj da uporabnik preneha tipkati
  type DebounceTimer = {
    time: ReturnType<typeof setTimeout> | null;
  };
  const debounceTimer = useRef<DebounceTimer>({ time: null });
  const dropdownRef = useRef(null);


  useEffect(() => {
    return () => {
      if (debounceTimer.current.time) {
        clearTimeout(debounceTimer.current.time);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    console.log(searchQuery)
    try {
      const res = await fetch('/api/getMovies',
        {
          method: 'POST',
          body: searchQuery,
        }
      );

      const movies = await res.json();

      setMovies(movies.results || []);

      setIsOpen(true);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const InputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer.current.time) {
      clearTimeout(debounceTimer.current.time);
    }

    debounceTimer.current.time = setTimeout(() => {
      searchMovies(value);
    }, 500);
  };



  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', zIndex: 10 }}>
      <h1>Movie Search</h1>

      <div style={{ position: 'relative', zIndex: 10 }} ref={dropdownRef}>
        <input
          className='search_input'
          type="text"
          value={query}
          onChange={InputChange}
          placeholder="Search for movies..."
        />
        {isLoading && <span style={{ position: 'absolute', right: '10px', top: '10px' }}>Loading...</span>}

        {isOpen && movies.length > 0 && (
          <div className='search_panel'>
            {movies.map((movie: any) => ( // type any zaenkrat
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className='search_item'>
                  {movie.poster_path &&
                    <Image
                      src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                      alt={movie.title}
                      width={50}
                      height={75}
                    />
                  }
                  <div>
                    <div><strong>{movie.title}</strong></div>
                    <div className='info'>
                      {movie.release_date?.split('-')[0] || 'N/A'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {isOpen && query && movies.length === 0 && !isLoading && (
          <div className='search_panel_empty'>
            No movies found
          </div>
        )}
      </div>
    </div>
  );
}