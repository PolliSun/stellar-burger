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
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push({ ...action.payload });
      },
      prepare: (ingredients: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredients, id: key } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const indexToRemove = state.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (indexToRemove !== -1) {
        state.ingredients.splice(indexToRemove, 1);
      }
    },
    moveIngredientPosition: (
      state,
      action: PayloadAction<{ index: number; newIndex: number }>
    ) => {
      const { index, newIndex } = action.payload;
      [state.ingredients[index], state.ingredients[index + newIndex]] = [
        state.ingredients[index + newIndex],
        state.ingredients[index]
      ];
    },
    clearIngredient: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { getConstructor } = constructorSlice.selectors;
export const getConstructorState = (state: RootState) =>
  state.constructorBurger;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  clearIngredient
} = constructorSlice.actions;
export const constructorReduce = constructorSlice.reducer;
