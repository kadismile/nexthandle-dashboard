import {createSlice} from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: {},
  },
  reducers: {
    setUser(state:any, action) {
      state.filter = {state, ...action.payload}
    },

    resetState(state: any) {
      state.filter = undefined;
    },
  },
});


export const { resetState, setUser} = filterSlice.actions;
export const selectFilter = (state: any) => state.filter.filter;

export default filterSlice.reducer;
