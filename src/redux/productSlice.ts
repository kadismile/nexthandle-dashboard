import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      product: [],
      productBrand: []
    },
  },
  reducers: {
    setProducts(state:any, action) {
      state.products.product = action.payload
    },

    setBrands(state:any, action) {
      state.products.productBrand = action.payload
    },

  },
});


export const { setProducts, setBrands } = productSlice.actions;
export const selectProduct = (state: any) => state.product.products.product;
export const selectProductBrand = (state: any) => state.product.products.productBrand;


export default productSlice.reducer;
