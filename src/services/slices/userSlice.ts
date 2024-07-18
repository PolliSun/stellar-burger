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
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      });
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
        state.error = '';
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
        state.error = '';
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
      });
  }
});

export const userReducer = userSlice.reducer;
export const getUserSelector = (state: RootState) => state.user.user;
export const getUserLoadingSelector = (state: RootState) => state.user.loading;
export const getUserErrorSelector = (state: RootState) => state.user.error;
export const getIsAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
