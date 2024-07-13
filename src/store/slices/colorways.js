import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

const getInitialState = () => {
  // Deep copy the initial settings to avoid mutating the original object
  return {
    ...initial_settings.colorways,
    custom: initial_settings.colorways.custom.map((colorway) => ({
      ...colorway,
    })),
    layout: { ...initial_settings.colorways.layout },
  };
};
export const colorwaysSlice = createSlice({
  name: "colorways",
  initialState: getInitialState(),
  reducers: {
    setColorway: (state, action) => {
      state.active = action.payload;
    },
    addCustomColorway: (state, action) => {
      state.custom = [...state.custom, action.payload];
    },
    removeCustomColorway: (state, action) => {
      state.custom = state.custom.filter((c) => c.id !== action.payload);
    },
    toggleEditing: (state) => {
      state.editing = !state.editing;
    },
    setActiveSwatch: (state, action) => {
      state.activeSwatch = action.payload;
    },
    updateCustomColorway: (state, action) => {
      state.custom = state.custom.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
    },
  },
});

export const {
  setColorway,
  addCustomColorway,
  removeCustomColorway,
  updateCustomColorway,
  toggleEditing,
  setActiveSwatch,
} = colorwaysSlice.actions;

export const selectColorway = (state) => state.colorways.active;
export const selectColorways = (state) => state.colorways.custom;
export const selectEditing = (state) => state.colorways.editing;
export const selectActiveSwatch = (state) => state.colorways.activeSwatch;

export default colorwaysSlice.reducer;
