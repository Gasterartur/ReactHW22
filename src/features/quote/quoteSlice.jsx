
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRandomQuote = createAsyncThunk(
  'quote/fetchRandomQuote',
  async () => {
    const response = await axios.get('https://dummyjson.com/quotes/random');
    return response.data;
  }
);

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: '',
    author: '',
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quote = action.payload.quote;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
