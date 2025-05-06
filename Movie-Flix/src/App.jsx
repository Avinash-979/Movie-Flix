import { useState, useEffect } from "react";
import Search from "./components/Search"; // Ensure the path is correct
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/movie/popular`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, Please Try Again");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies); // Set the trending movies state
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      fetchMovies(); // Fetch popular movies if search term is empty
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch popular movies on initial load
  }, []);

  useEffect(() => {
    loadTrendingMovies(); // Load trending movies on component mount
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Say goodbye to <span className="text-gradient">“what should I watch?”</span> forever
            </h1>
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          </header>

          {trendingMovies.length > 0 && ( // Check trendingMovies state
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className='all-movies'>
            <h2>Movies</h2>
            {isLoading ? (
              <p className="text-white">Loading...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : movieList.length === 0 ? (
              <p>No movies found for "{searchTerm}". Please try a different search.</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
