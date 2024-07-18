import { rootReducer } from '../../rootReducer';
import { configureStore } from '@reduxjs/toolkit';

import { expect, test } from '@jest/globals';

test('Тест проверка инициализации rootReducer', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const store = configureStore({
    reducer: rootReducer
  });

  const state = rootReducer(undefined, action);
  const initialState = store.getState();
  expect(state).toEqual(initialState);
});
