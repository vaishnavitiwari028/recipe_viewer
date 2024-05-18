
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipesByLetter,
  selectRecipe,
  toggleFavorite,
  reorderRecipes,
} from "../store/recipesSlice";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import "./RecipeList.scss";
import HeartOutlineIcon from "../assets/icons/heart-icon-outline.png";
import HeartIcon from "../assets/icons/heart-icon-filled.jpg";
import gsap from "gsap";

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.recipes.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipesByLetter("c"));
    gsap.from(".recipe-item", { opacity: 0, y: 50, duration: 1, ease: "back.out(1.7)" });
  }, [dispatch]);

  const handleSelectRecipe = (recipe) => {
    dispatch(selectRecipe(recipe));
  };

  const handleToggleFavorite = (recipeId) => {
    dispatch(toggleFavorite(recipeId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedRecipes = Array.from(recipes);
    const [movedRecipe] = reorderedRecipes.splice(result.source.index, 1);
    reorderedRecipes.splice(result.destination.index, 0, movedRecipe);
    dispatch(reorderRecipes(reorderedRecipes));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipes">
        {(provided) => (
          <div
            className="recipe-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {recipes.map((recipe, index) => (
              <Draggable
                key={recipe.idMeal}
                draggableId={recipe.idMeal.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="recipe-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                      {favorites.includes(recipe.idMeal) ? (
                        <img
                          className="heart-icon"
                          width={20}
                          src={HeartIcon}
                          alt="Favorited"
                        />
                      ) : (
                        <img
                          className="heart-icon"
                          width={20}
                          src={HeartOutlineIcon}
                          alt="Unfavorited"
                        />
                      )}
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeList;
