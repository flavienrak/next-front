import { createSlice } from "@reduxjs/toolkit";

const initialState = { notifications: [], actualNotification: {} };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    fetchNotificationsInfos: (state, action) => {
      const { notifications } = action.payload;
      let newState = { ...state };
      newState.notifications = notifications;
      return newState;
    },

    updateNotifications: (state, action) => {
      const { notifications } = action.payload;
      let newState = { ...state };
      newState.notifications = notifications;
      return newState;
    },
    setActualNotification: (state, action) => {
      const { actualNotification } = action.payload;
      let newState = { ...state };
      newState.actualNotification = actualNotification;
      return newState;
    },

    removeNotificationsInfos: () => {
      return initialState;
    },
  },
});

export const {
  fetchNotificationsInfos,
  updateNotifications,
  setActualNotification,
  removeNotificationsInfos,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
