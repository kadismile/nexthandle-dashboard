import {createSlice} from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: [],
  },
  reducers: {
    setVendors(state:any, action) {
      state.vendor = action.payload
    },

  },
});


export const { setVendors } = vendorSlice.actions;
export const selectVendor = (state: any) => state.vendor.vendor;


export default vendorSlice.reducer;
