import { describe, expect, test } from '@jest/globals';
import {
  orderReducer as reducer,
  getOrderByNumber,
  getOrder,
  initialState
} from '../orderSlice';
import { mockOrderByNumber, mockOrders } from '../mockData';

describe('Тестирование экшенов заказов', () => {
  test('Тест обработка начального состояния заказов', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Тестирование работы редьюсеров для getOrderByNumber', () => {
  test('Тест обработка состояния getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(true);
    expect(state.currentOrder).toBe(null);
  });

  test('Тест обработка состояния getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка загрузки getOrderByNumber';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrderByNumber
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrderByNumber.orders[0]);
  });
});

describe('Тестирование работы редьюсеров для getOrder', () => {
  test('Тест обработка состояния getOrder.pending', () => {
    const action = { type: getOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест обработка состояния getOrder.rejected', () => {
    const errorMessage = 'Ошибка загрузки getOrder';
    const action = {
      type: getOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getOrder.fulfilled', () => {
    const action = { type: getOrder.fulfilled.type, payload: mockOrders };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(mockOrders);
  });
});
