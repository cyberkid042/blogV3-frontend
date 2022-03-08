import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSessionExpired: false,
};

const checkStatusSlice = createSlice({
  name: "sessionCheck",
  initialState,
  reducers: {
    updateIsSessionExpired(state) {
      state.isSessionExpired = true;
    },
    clearIsSessionExpired(state) {
      state.isSessionExpired = false;
    },
  },
});

export const { updateIsSessionExpired, clearIsSessionExpired } =
  checkStatusSlice.actions;
export default checkStatusSlice.reducer;
