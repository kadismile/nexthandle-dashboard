import {createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {
    setCategories(state:any, action) {
      state.category = action.payload
    }
  },
});

export const { setCategories } = categorySlice.actions;
export const selectCategory = (state: any) => state.category.category;


export default categorySlice.reducer;
