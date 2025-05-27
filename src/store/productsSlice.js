import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
      const res = await fetch('/api');
      const data = await res.json();
      return data.items;
    }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    favorites: [],
    cart: [],
    status: 'idle',
  },
  reducers: {
    addToFavorites(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    addToCart(state, action) {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(id => id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
} = productsSlice.actions;

export default productsSlice.reducer;
