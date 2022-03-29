import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
 name: "category",
 initialState: {
  category: [],
 },
 reducers: {
  setCategories(state: any, action) {
   state.category = action.payload;
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

export const { setCategories, updateCategories } = categorySlice.actions;
export const selectCategory = (state: any) => state.category.category;

export default categorySlice.reducer;
