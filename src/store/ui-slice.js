import { createSlice } from "@reduxjs/toolkit";

const redux = require("redux");
const initialState = { cartIsVisible: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
