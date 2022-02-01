import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      product: [],
      productBrand: [],
      isActive: true
    },
  },
  reducers: {
    setProducts(state:any, action) {
      state.products.product = action.payload
    },

    setIsActive(state:any, action) {
      console.log("ACTION**** ", action)
      state.products.isActive = action.payload.isActive
    },

    setBrands(state:any, action) {
      state.products.productBrand = action.payload
    },

  },
});


export const { setProducts, setBrands, setIsActive } = productSlice.actions;
export const selectProduct = (state: any) => state.product.products.product;
export const selectProductBrand = (state: any) => state.product.products.productBrand;
export const selectProductIsActive = (state: any) => state.product.products.isActive;


export default productSlice.reducer;
