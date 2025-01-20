import React from 'react';

function Favorites({ favorites, setFavorites }) {
  const handleDelete = (indexToDelete) => {
    const updatedFavorites = favorites.filter((_, index) => index !== indexToDelete);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h4>Favorite Quotes</h4>
      {favorites.length > 0 ? (
        <ul className='favorites-list'>
          {favorites.map((fav, index) => (
            <li key={index}>
              <p>"{fav.quote}" - {fav.author}</p>
              <button className='delete-button' onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite quotes saved.</p>
      )}
    </div>
  );
}

export default Favorites;
