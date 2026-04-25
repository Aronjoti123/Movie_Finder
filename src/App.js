import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import Screenshots from "./components/Screenshots";
import "./App.css";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("avengers");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMovies(query);
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  const fetchMovies = async (q) => {
    const res = await fetch(`https://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`);
    const data = await res.json();
    setMovies(data.Search || []);
  };

  const toggleFav = (movie) => {
    let updated;
    if (favorites.find((m) => m.imdbID === movie.imdbID)) {
      updated = favorites.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>🎬 Movie Finder</h1>

      <SearchBar setQuery={setQuery} />
      <Screenshots />

      <button className="favorites-toggle" onClick={() => setShowFavorites(!showFavorites)}>
        ❤️ Favorites ({favorites.length})
      </button>

      {showFavorites && (
        <div className="favorites-section">
          <h2>My Favorite Movies</h2>
          {favorites.length === 0 ? (
            <p className="no-favorites">No favorite movies yet. Add some to get started! 🍿</p>
          ) : (
            <div className="grid">
              {favorites.map((m) => (
                <MovieCard
                  key={m.imdbID}
                  movie={m}
                  onClick={() => setSelected(m.imdbID)}
                  onFav={() => toggleFav(m)}
                  isFav={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <h2>Search Results</h2>
      <div className="grid">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            onClick={() => setSelected(m.imdbID)}
            onFav={() => toggleFav(m)}
            isFav={favorites.some((f) => f.imdbID === m.imdbID)}
          />
        ))}
      </div>

      {selected && (
        <MovieModal id={selected} close={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
