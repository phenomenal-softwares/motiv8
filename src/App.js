import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Favorites from './Favorites';
import LoadingScreen from './LoadingScreen';
import { FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [categories] = useState(["age","alone","amazing","anger","anniversary","architecture","art","attitude","beauty",
    "best","birthday","business","car","change","communication","computers","cool","courage","dad","dating","death","design",
    "diet","dreams","education","environmental","equality","experience","failure","faith","family","famous","fear","finance",
    "fitness","food","forgiveness","freedom","friendship","funny","future","gardening","god","good","government","graduation",
    "great","happiness","health","history","home","hope","humor","imagination","inspirational","intelligence","jealousy","knowledge",
    "leadership","learning","legal","life","love","marriage","medical","men","mom","money","morning","motivational","movies",
    "movingon","music","nature","parenting","patience","patriotism","peace","pet","poetry","politics",
    "positive","power","relationship","religion","respect","romantic","sad","science","smile","society",
    "sports","strength","success","sympathy","teacher","technology","teen","thankful","time","travel","trust","truth","war",
    "wedding","wisdom","women","work","christmas","easter","fathersday","memorialday","mothersday","newyears",
    "saintpatricksday","thanksgiving","valentinesday"]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
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
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c44618e22dmsh4db4a1fc50c2dbap145d34jsnb7d41e53f133',
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
      },
    };

    const url = selectedCategory
      ? `https://famous-quotes4.p.rapidapi.com/random?category=${selectedCategory}`
      : 'https://famous-quotes4.p.rapidapi.com/random';
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Adjust based on the actual response structure
    if (Array.isArray(data) && data.length > 0) {
      const quoteObject = data[0]; // Assuming the first item contains the quote
      setQuote(quoteObject.text || quoteObject.quote || 'No quote available');
      setAuthor(quoteObject.author || 'Unknown');
    } else {
      throw new Error('Unexpected API response format');
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
    setQuote('Failed to load quote. Please try again later.');
    setAuthor('');
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
                  <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All</option>
                    {categories.map((cat) => (
                      <option className='category-list' key={cat} value={cat}>
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
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Facebook"
                  >
                    <FaFacebook size={30} />
                  </a>
                  <a
                    href={`https://wa.me/?text=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={30} />
                  </a>
                  <a
                    href={`mailto:?subject=Quote&body=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share via Gmail"
                  >
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
