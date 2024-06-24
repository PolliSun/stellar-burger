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
  error: string;
  loading: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: '',
  loading: false
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = '';
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = '';
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = '';
        state.user = null;
        state.isAuthChecked = false;
        state.loading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const userReducer = userSlice.reducer;
export const getUserSelector = (state: RootState) => state.user.user;
export const getUserLoadingSelector = (state: RootState) => state.user.loading;
export const getUserErrorSelector = (state: RootState) => state.user.error;
export const getIsAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
