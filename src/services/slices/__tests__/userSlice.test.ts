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
import { mockUser as mock } from '../mockData';

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
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка загрузки loginUser' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки loginUser');
  });

  test('Тест обработка состояния loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: mock
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mock);
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
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка загрузки registerUser' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки registerUser');
  });

  test('Тест обработка состояния registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: mock
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mock);
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
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Ошибка загрузки logoutUser' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки logoutUser');
  });

  test('Тест обработка состояния logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toBeNull();
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
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка загрузки updateUser' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки updateUser');
  });

  test('Тест обработка состояния updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: mock
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mock);
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
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Ошибка загрузки getUser' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки getUser');
  });

  test('Тест обработка состояния getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        user: mock
      }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mock);
    expect(state.isAuthChecked).toBe(true);
  });
});
