import { createSlice } from "@reduxjs/toolkit";

const redux = require("redux");
const initialState = { items: [] };

createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add(state) {},
  },
});
