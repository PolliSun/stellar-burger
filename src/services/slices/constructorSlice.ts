import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredients, id: key } };
      }
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientPosition: (state, action) => {
      const { index, newIndex } = action.payload;
      [state.ingredients[index], state.ingredients[index + newIndex]] = [
        state.ingredients[index + newIndex],
        state.ingredients[index]
      ];
    },
    clearIngredient: (state) => (state = initialState)
  }
});

export const getConstructorState = (state: RootState) =>
  state.constructorBurger;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  clearIngredient
} = constructorSlice.actions;
export const constructorReduce = constructorSlice.reducer;
