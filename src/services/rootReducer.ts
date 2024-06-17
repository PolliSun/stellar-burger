import { combineReducers } from '@reduxjs/toolkit';
import { ingredientReduce } from './slices/ingredientsSlice';
import { constructorReduce } from './slices/constructorSlice';
import { feedReduce } from './slices/feedSlice';
import { orderReducer } from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientReduce,
  constructorBurger: constructorReduce,
  feed: feedReduce,
  order: orderReducer
});
