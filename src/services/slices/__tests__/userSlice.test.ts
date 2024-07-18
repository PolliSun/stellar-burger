import { describe, expect, test } from '@jest/globals';
import {
  userReducer as reducer,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUser,
  initialState
} from '../userSlice';
import { mockUser } from '../mockData';

describe('Тестирование экшенов загрузки пользователя', () => {
  test('Тест обработка начального состояния пользователя', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Тестирование работы редьюсеров для loginUser', () => {
  test('Тест обработка состояния loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест обработка состояния loginUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки loginUser';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование работы редьюсеров для registerUser', () => {
  test('Тест обработка состояния registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест обработка состояния registerUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки registerUser';
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование работы редьюсеров для logoutUser', () => {
  test('Тест обработка состояния logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест обработка состояния logoutUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки logoutUser';
    const action = {
      type: logoutUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(false);
  });
});

describe('Тестирование работы редьюсеров для updateUser', () => {
  test('Тест обработка состояния updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест обработка состояния updateUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки updateUser';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Тестирование работы редьюсеров для getUser', () => {
  test('Тест обработка состояния getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Тест обработка состояния getUser.rejected', () => {
    const errorMessage = 'Ошибка загрузки getUser';
    const action = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Тест обработка состояния getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});
