import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsBun: (state) =>
      state.ingredients.filter((item) => item.type === 'bun'),
    getIngredientsMain: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    getIngredientsSauce: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientReduce = ingredientSlice.reducer;
export const {
  getIngredientsState,
  getIngredientsLoading,
  getIngredientsBun,
  getIngredientsMain,
  getIngredientsSauce
} = ingredientSlice.selectors;
