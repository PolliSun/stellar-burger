import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { RootState } from '../store';

export type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  (data: TLoginData) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  (data: TRegisterData) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuthChecked = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      });
  }
});

export const userReducer = userSlice.reducer;
export const getUserSelector = (state: RootState) => state.user.user;
export const getIsAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
