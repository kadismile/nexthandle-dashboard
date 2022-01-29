import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state:any, action) {
      state.user = action.payload
    },
    setToken(state:any, action) {
      state.user.token = action.payload
    },
    resetState(state: any) {
      state.user = undefined;
      localStorage.setItem('persist:root', '')
    },
  },
});


export const { resetState, setUser, setToken } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;



export default userSlice.reducer;
