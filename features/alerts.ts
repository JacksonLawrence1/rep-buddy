import { createSlice } from "@reduxjs/toolkit";

export interface AlertProps {
  visible: boolean;
  title?: string;
  description?: string;
}

const alerts = createSlice({
  name: "alerts",
  initialState: { visible: false } as AlertProps,
  reducers: {
    showAlert: (state, action) => {
      const { title, description } = action.payload;

      state.title = title;
      state.description = description;
      state.visible = true;
      // optionally add a callback if we wanted to do something after showing the alert
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alerts.actions;
export default alerts.reducer;

// Selectors:
export const alertDetails = (state: AlertProps) => state;
