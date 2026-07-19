import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
  email: localStorage.getItem("email") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
  state.isAuthenticated = true;
  state.token = action.payload.token;
  state.userId = action.payload.userId;
  state.email = action.payload.email;
},

    logout(state) {
  state.token = "";
  state.userId = "";
  state.email = "";
  state.isAuthenticated = false;

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
}
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;