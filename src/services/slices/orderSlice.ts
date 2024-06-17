import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';

export type TOrderState = {
  orders: TOrder | null;
  orderRequest: boolean;
  orderModal: null | TOrder;
  error: string | null;
  loading: boolean;
};

export const initialState: TOrderState = {
  orders: null,
  orderRequest: false,
  orderModal: null,
  error: null,
  loading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModal: (state) => state.orderModal
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = false;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderRequest = false;
        state.orders = action.payload.order;
      });
  }
});

export const getOrderState = (state: RootState) => state.order;
export const { getOrderRequest, getOrderModal } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
