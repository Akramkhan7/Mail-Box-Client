import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  sent: [],
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

    setSent(state, action) {
      state.sent = action.payload;
    },

    markAsRead(state, action) {
      const mail = state.inbox.find((item) => item.id === action.payload);

      if (mail && !mail.read) {
        mail.read = true;
        state.unreadCount--;
      }
    },
    deleteMail(state, action) {
      state.inbox = state.inbox.filter((mail) => mail.id !== action.payload);
      state.unreadCount = state.inbox.filter((mail) => !mail.read).length;
    },
    clearMail(state) {
      state.inbox = [];
      state.sent = [];
      state.unreadCount = 0;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
