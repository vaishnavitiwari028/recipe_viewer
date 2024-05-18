import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import FavoriteRecipes from './components/FavoriteRecipes';
import './App.scss';
import gsap from 'gsap';

const App = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    gsap.from(".recipe-list-container", { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" });
    gsap.from(".recipe-detail-container", { opacity: 0, x: 50, duration: 1, ease: "power2.inOut" });
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
      gsap.fromTo(button, 
        { scale: 1 },
        { scale: 1.1, duration: 0.2, ease: "power2.inOut", paused: true, yoyo: true, repeat: -1, delay: 0.5 }
      );
    });
  }, []);

  const handleButtonClick = () => {
    setShowFavorites(!showFavorites);
    gsap.fromTo(".toggle-button", 
      { scale: 1.1 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  };

  return (
    <div className="app">
      <div className="recipe-list-container">
        <h1>Recipes</h1>
        {showFavorites ? <FavoriteRecipes /> : <RecipeList />}
        <button className="toggle-button" onClick={handleButtonClick}>
          {showFavorites ? 'Show All Recipes' : 'Show Favorite Recipes'}
        </button>
      </div>
      <div className="recipe-detail-container">
        <h1>Recipe Details</h1>
        <RecipeDetail />
      </div>
    </div>
  );
};

export default App;
