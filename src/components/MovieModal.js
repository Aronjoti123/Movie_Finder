import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function MovieModal({ id, close }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="modal" onClick={close}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="loading">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data || data.Response === 'False') {
    return (
      <div className="modal" onClick={close}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p>Movie not found</p>
          <button onClick={close}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{data.Title}</h2>
          <button className="close-btn" onClick={close}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-poster">
            <img 
              src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={data.Title}
            />
          </div>
          
          <div className="modal-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">⭐ Rating</span>
                <span className="info-value">{data.imdbRating || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📅 Year</span>
                <span className="info-value">{data.Year || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">⏱️ Duration</span>
                <span className="info-value">{data.Runtime || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🎬 Type</span>
                <span className="info-value">{data.Type || 'N/A'}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Plot</h3>
              <p>{data.Plot || 'No plot available'}</p>
            </div>

            {data.Director && (
              <div className="info-section">
                <h3>Director</h3>
                <p>{data.Director}</p>
              </div>
            )}

            {data.Genre && (
              <div className="info-section">
                <h3>Genres</h3>
                <p>{data.Genre}</p>
              </div>
            )}

            {data.Actors && (
              <div className="info-section">
                <h3>Cast</h3>
                <p>{data.Actors}</p>
              </div>
            )}

            {data.Awards && data.Awards !== 'N/A' && (
              <div className="info-section">
                <h3>🏆 Awards</h3>
                <p>{data.Awards}</p>
              </div>
            )}

            <div className="info-section">
              <h3>🎥 Where to Watch</h3>
              <p>Find this movie on your favorite streaming platform:</p>
              <div className="streaming-links">
                <a href={`https://www.imdb.com/title/${data.imdbID}/`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  IMDb
                </a>
                <a href={`https://www.justwatch.com/search?q=${encodeURIComponent(data.Title)}`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  JustWatch
                </a>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(data.Title + ' where to watch')}`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  Google Search
                </a>
                <a href={`https://www.amazon.com/s?k=${encodeURIComponent(data.Title)}`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  Amazon Prime
                </a>
                <a href={`https://www.netflix.com/search?q=${encodeURIComponent(data.Title)}`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  Netflix
                </a>
                <a href={`https://www.disneyplus.com/search?q=${encodeURIComponent(data.Title)}`} target="_blank" rel="noopener noreferrer" className="streaming-btn">
                  Disney+
                </a>
              </div>
            </div>

            <button className="modal-close-btn" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
