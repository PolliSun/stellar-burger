import { describe, expect, test } from '@jest/globals';
import { feedReduce as reducer, getFeedApi, initialState } from '../feedSlice';
import { mockFeed } from '../mockData';

describe('Тестирование работы редьюсеров слайса feedSlice', () => {
  test('Тест обработка начального состояния заказов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Тест обработка состояния getFeedApi.pending', () => {
    const action = { type: getFeedApi.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест обработка состояния getFeedApi.rejected', () => {
    const errorMessage = 'Ошибка загрузки getFeedApi';
    const action = {
      type: getFeedApi.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getFeedApi.fulfilled', () => {
    const action = { type: getFeedApi.fulfilled.type, payload: mockFeed };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.feed).toEqual(mockFeed);
  });
});
