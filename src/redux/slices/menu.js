import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {v4 as uuid} from "uuid";
const menuSlice = createSlice({
  name: "Menu",
  initialState: {
    value: [],
    restraunt: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.value = action.payload.menuData;
      state.restraunt = action.payload.restraunt;
    });
    builder.addCase(fetchMenu.rejected, (state, action) => {
      state.error = action.error;
      state.value = [];
    });
    builder.addCase(fetchMenu.pending, (state, action) => {
      state.value = [];
    });
  },
});

export const fetchMenu = createAsyncThunk("menu/fetch", async (args) => {
  const { data } = await axios.get(args.url);
  const menuData =  data.map(e => ({...e, id: uuid().split("-").join("")}));
  return {
    menuData,
    restraunt: args.restraunt
  }
});

export default menuSlice.reducer;
