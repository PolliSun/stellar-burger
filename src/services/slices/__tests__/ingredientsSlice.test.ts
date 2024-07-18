import { describe, expect, test } from '@jest/globals';
import {
  ingredientReduce as reducer,
  getIngredients,
  initialState
} from '../ingredientsSlice';
import { mockIngredients } from '../mockData';

describe('Тестирование работы редьюсеров для ingredientsSlice', () => {
  test('Тест обработка начального состояния ингредиентов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Тест обработка состояния getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест обработка состояния getIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки getIngredients';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getIngredients.fulfilled', () => {
    const mock = mockIngredients.ingredients;
    const action = getIngredients.fulfilled(mock, '');
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(mock);
  });
});
