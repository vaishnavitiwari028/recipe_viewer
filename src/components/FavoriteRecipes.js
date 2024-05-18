import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipe, toggleFavorite } from '../store/recipesSlice';
import './RecipeList.scss';
import HeartIcon from '../assets/icons/heart-icon-filled.jpg';
import gsap from 'gsap';

const FavoriteRecipes = () => {
  const favorites = useSelector((state) => state.recipes.favorites);
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.idMeal));

  useEffect(() => {
    gsap.from(".recipe-item", { opacity: 0, y: 50, duration: 1, ease: "back.out(1.7)" });
  }, [favoriteRecipes]);

  const handleSelectRecipe = (recipe) => {
    dispatch(selectRecipe(recipe));
  };

  const handleToggleFavorite = (recipeId) => {
    dispatch(toggleFavorite(recipeId));
  };

  return (
    <div className="recipe-list">
      {favoriteRecipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="recipe-item"
          onClick={() => handleSelectRecipe(recipe)}
        >
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(recipe.idMeal);
            }}
          >
            <img
              className="heart-icon"
              width={20}
              src={HeartIcon}
              alt="Favorited"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
