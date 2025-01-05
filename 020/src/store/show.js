import { createSlice } from "@reduxjs/toolkit";

const show = createSlice({
  name: 'show',
  initialState: {
    showState: false,
    notification: null
  },
  reducers: {
    toggle(state) {
      state.showState = !state.showState
    },
    showNotification(state,action) {
      state.notification = {
        status:action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    }
  }
})

export const showActions = show.actions;

const showReducer = show.reducer;

export default showReducer;