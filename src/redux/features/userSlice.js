import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUserState(state, action) {
      state.user = action.payload;
    },
    logUserOut(state) {
      state.user = null;
    },
  },
});

export const { logUserState, logUserOut } = userSlice.actions;
export default userSlice.reducer;
