import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RecipeDetail.scss';
import { fetchRecipeDetails } from '../store/recipesSlice';
import { gsap } from 'gsap';

const RecipeDetail = () => {
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRecipe) {
      dispatch(fetchRecipeDetails(selectedRecipe.idMeal));
      gsap.from(".recipe-detail", { opacity: 0, y: 50, duration: 1, ease: "power2.inOut" });
    }
  }, [dispatch, selectedRecipe]);

  if (!selectedRecipe) {
    return <div className="recipe-detail">Select a recipe to see details</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{selectedRecipe.strMeal}</h2>
      <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
      <p>{selectedRecipe.strInstructions}</p>
      <ul>
        {Object.keys(selectedRecipe)
          .filter(key => key.includes('strIngredient') && selectedRecipe[key])
          .map((key, index) => (
            <li key={index}>{selectedRecipe[key]}</li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;
