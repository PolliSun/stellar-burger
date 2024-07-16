import { describe, expect, test } from '@jest/globals';
import {
  constructorReduce as reducer,
  addIngredient,
  removeIngredient,
  moveIngredientPosition,
  setOrderModalData,
  createOrder,
  initialState
} from '../constructorSlice';

import { mockOrder, mockBun, mockMain } from '../mockData';
import { nanoid } from '@reduxjs/toolkit';

describe('Тестирование экшенов конструктора', () => {
  test('Тест обработка начального состояния конструктора', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Тест обработка состояния добавления булочки', () => {
    const action = addIngredient(mockBun);
    const state = reducer(initialState, action);
    expect(state.bun).toEqual(
      expect.objectContaining({
        ...mockBun,
        id: expect.any(String)
      })
    );
  });

  test('Тест обработка состояния добавления начинки', () => {
    const action = addIngredient(mockMain);
    const state = reducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        ...mockMain,
        id: expect.any(String)
      })
    );
  });

  test('Тест обработка состояния удаления ингредиента', () => {
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockMain, id: '123' }]
    };
    const action = removeIngredient('123');
    const state = reducer(initialStateWithIngredient, action);
    expect(state.ingredients.length).toBe(0);
  });

  test('Тест обработка состояния изменения порядка ингредиентов', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockMain, id: '1' },
        { ...mockMain, id: '2' }
      ]
    };
    const action = moveIngredientPosition({ index: 0, newIndex: 1 });
    const state = reducer(initialStateWithIngredients, action);
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  test('Тест обработка состояния установки данных модального окна заказа', () => {
    const action = setOrderModalData(mockOrder);
    const state = reducer(initialState, action);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('Тест очистки ингредиентов после оформления заказа', () => {
    const initialStateWithOrder = {
      ...initialState,
      ingredients: [{ ...mockMain, id: nanoid() }],
      bun: { ...mockBun, id: nanoid() },
      orderModalData: mockOrder
    };
    const action = setOrderModalData(null);
    const state = reducer(initialStateWithOrder, action);
    expect(state.ingredients.length).toBe(0);
    expect(state.bun).toBe(null);
    expect(state.orderModalData).toBe(null);
  });
});

describe('Тестирование работы редьюсеров для createOrder', () => {
  test('Тест обработка состояния createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(true);
  });

  test('Тест обработка состояния createOrder.rejected', () => {
    const errorMessage = 'Ошибка создания заказа createOrder';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });
});
