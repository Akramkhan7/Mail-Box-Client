import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  unreadCount: 0,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setInbox(state, action) {
      state.inbox = action.payload;
      state.unreadCount = action.payload.filter((mail) => !mail.read).length;
    },

    markAsRead(state, action) {
      const mail = state.inbox.find((item) => item.id === action.payload);

      if (mail && !mail.read) {
        mail.read = true;
        state.unreadCount--;
      }
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
