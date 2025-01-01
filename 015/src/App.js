import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler= useCallback(async()=>{
    try{
      setIsLoading(true);
      setError(null)
      const response = await fetch('https://swapi.py4e.com/api/films');

      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();


      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
    } catch(err) {
      setError(err.message)
      console.error('ERROR: ', err.message)
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [])

  let content = <p>Found no movies.</p>


  if(movies.length > 0) {
    content = <p><MoviesList movies={movies} /></p>

  }

  if(error) {
    content = <p>{error}</p>
  }

  if(isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;