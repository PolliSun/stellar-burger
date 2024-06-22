import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { RootState } from '../store';

export type TFeedState = {
  feed: TOrdersData;
  loading: boolean;
};

export const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const getFeedApi = createAsyncThunk('feed/getFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedApi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getFeedApi.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      });
  }
});

export const feedReduce = feedSlice.reducer;
export const getFeed = (state: RootState) => state.feed.feed;
