import React from "react";

function MovieCard({ movie, onClick, onFav, isFav }) {
  const handleImageClick = () => {
    console.log("Movie clicked:", movie.Title, "ID:", movie.imdbID);
    onClick();
  };

  return (
    <div className="card">
      <div className="card-image-container" onClick={handleImageClick}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}
          alt={movie.Title}
        />
        <div className="card-overlay">
          <span className="click-hint">👁️ Click for details</span>
        </div>
      </div>
      <h3 title={movie.Title}>{movie.Title}</h3>
      <p className="year">{movie.Year}</p>
      <p className="type">Type: {movie.Type}</p>
      <button onClick={onFav} className={isFav ? 'fav-btn active' : 'fav-btn'}>
        {isFav ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;
