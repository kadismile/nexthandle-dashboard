import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
 name: "category",
 initialState: {
  category: [],
  oneCategory: {},
 },
 reducers: {
  setCategories(state: any, action) {
   state.category = action.payload;
  },

  setCategory(state: any, action) {
   if (state.oneCategory._id !== action.payload._id) {
    state.oneCategory = action.payload;
   } else {
    state.oneCategory = {};
   }
  },

  updateCategories(state: any, action) {
   const existItemIndex = state.category.findIndex(
    (item: any) => item._id === action.payload._id
   );
   if (existItemIndex >= 0) {
    state.category[existItemIndex] = action.payload;
   }
  },
 },
});

export const { setCategories, updateCategories, setCategory } =
 categorySlice.actions;
export const selectCategory = (state: any) => state.category.category;
export const singleCategory = (state: any) => state.category.oneCategory;
export default categorySlice.reducer;
