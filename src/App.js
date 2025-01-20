import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Favorites from './Favorites';
import LoadingScreen from './LoadingScreen';
import {FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [categories] = useState(['motivational', 'life', 'love', 'success', 'sports', 'humorous', 'wisdom']);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [isLoading, setIsLoading] = useState(true); // State for the loading screen


  useEffect(() => {
    // Display the loading screen for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  const fetchQuote = async (selectedCategory = '') => {
    try {
      const url = selectedCategory
        ? `http://api.quotable.io/random?tags=${selectedCategory}`
        : 'http://api.quotable.io/random';
      const response = await fetch(url);
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    fetchQuote(selectedCategory);
  };

  const handleFavorite = () => {
    const newFavorite = { quote, author };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const shareUrl = encodeURIComponent(`"${quote}" - ${author}`);

  // Render loading screen if still loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
      <h1>Motiv8</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                
                <div className="controls">
                  <label htmlFor="category">Select Category: </label>
                  <select id="category" value={category} onChange={handleCategoryChange}>
                    <option value="">All</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="quote-box">
                  <p>"{quote}"</p>
                  <p>- {author}</p>
                  <button onClick={() => fetchQuote(category)}>Get New Quote</button>
                  <button onClick={handleFavorite}>Save to Favorites</button>
                </div>
                <div className="share-buttons">
                  <h3>Share This Quote:</h3>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                    <FaFacebook size={30} />
                  </a>
                  <a href={`https://wa.me/?text=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
                    <FaWhatsapp size={30} />
                  </a>
                  <a href={`mailto:?subject=Quote&body=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share via Gmail">
                    <FaEnvelope size={30} />
                  </a>
                </div>
              </div>
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
