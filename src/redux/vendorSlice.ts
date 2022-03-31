import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
 name: "vendor",
 initialState: {
  vendor: [],
  oneVendor: {},
 },
 reducers: {
  setVendors(state: any, action) {
   if (state.vendor._id === action.payload.id) {
    state.vendor = {};
   } else {
    state.vendor = action.payload;
   }
  },
  setSingleVendor(state: any, action) {
   state.oneVendor = action.payload;
  },
 },
});

export const { setVendors, setSingleVendor } = vendorSlice.actions;
export const selectVendor = (state: any) => state.vendor.vendor;
export const selectOneVendor = (state: any) => state.vendor.oneVendor;

export default vendorSlice.reducer;
