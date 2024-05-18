import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipesByLetter = createAsyncThunk(
  'recipes/fetchByLetter',
  async (letter) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    return response.data.meals;
  }
);

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchDetails',
  async (id, { getState }) => {
    const state = getState();
    const existingRecipe = state.recipes.recipes.find(recipe => recipe.idMeal === id);
    if (existingRecipe) {
      return existingRecipe;
    }
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.meals[0];
  }
);

const initialState = {
  recipes: [],
  selectedRecipe: null,
  favorites: [],
  status: 'idle',
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    selectRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter(id => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
    },
    reorderRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByLetter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByLetter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByLetter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectRecipe, toggleFavorite, reorderRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
