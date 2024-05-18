import React from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.scss';
import gsap from 'gsap';

const App = () => {
  React.useEffect(() => {
    gsap.from(".recipe-list-container", { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" });
    gsap.from(".recipe-detail-container", { opacity: 0, x: 50, duration: 1, ease: "power2.inOut" });
  }, []);

  return (
    <div className="app">
      <div className="recipe-list-container">
        <h1>Recipes</h1>
        <RecipeList />
      </div>
      <div className="recipe-detail-container">
        <h1>Recipe Details</h1>
        <RecipeDetail />
      </div>
    </div>
  );
};

export default App;
