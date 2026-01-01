import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fcmTriggerCount: 0, // will increment on each FCM message
};

export const fcmSlice = createSlice({
  name: "fcm",
  initialState,
  reducers: {
    triggerFcmNotification: (state) => {
      state.fcmTriggerCount += 1;
    },
  },
});

export const { triggerFcmNotification } = fcmSlice.actions;
export default fcmSlice.reducer;
