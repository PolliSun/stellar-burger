import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { RootState } from '../store';

export type TOrderState = {
  orders: TOrder[];
  orderRequest: boolean;
  error: string | null;
  orderModalData: null | TOrder;
};

export const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  error: null,
  orderModalData: null
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

export const getOrder = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.orderRequest = false;
        state.orderModalData = action.payload;
      });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderModalData = action.payload.orders[0];
    });
  }
});

export const getOrderRequest = (state: RootState) => state.order.orderRequest;
export const getOrderModal = (state: RootState) => state.order.orderModalData;
export const { resetOrderModalData } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
