import React from "react";

function Screenshots() {
  const screenshots = [
    {
      id: 1,
      title: "Search Movies",
      description: "Search for any movie by title",
      icon: "🔍",
      color: "#ff6b6b"
    },
    {
      id: 2,
      title: "Movie Details",
      description: "View detailed information about movies",
      icon: "📽️",
      color: "#ffd93d"
    },
    {
      id: 3,
      title: "Add Favorites",
      description: "Save your favorite movies",
      icon: "❤️",
      color: "#ff1744"
    },
    {
      id: 4,
      title: "Streaming Links",
      description: "Find where to watch on streaming platforms",
      icon: "🎥",
      color: "#00d4ff"
    },
    {
      id: 5,
      title: "Responsive Design",
      description: "Works perfectly on all devices",
      icon: "📱",
      color: "#6bcf7f"
    },
    {
      id: 6,
      title: "Beautiful UI",
      description: "Modern dark theme with glassmorphism",
      icon: "✨",
      color: "#b19cd9"
    }
  ];

  return (
    <div className="screenshots-section">
      <h2>✨ Features & Screenshots</h2>
      <p className="screenshots-subtitle">Discover what makes Movie Finder special</p>
      
      <div className="screenshots-grid">
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="screenshot-card" style={{ "--accent-color": screenshot.color }}>
            <div className="screenshot-icon">{screenshot.icon}</div>
            <h3>{screenshot.title}</h3>
            <p>{screenshot.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Screenshots;
