import { createSlice } from "@reduxjs/toolkit";

const initialState = { isMouseTrail: true };

const persistSlice = createSlice({
  name: "persistInfos",
  initialState,
  reducers: {
    updatePersistInfos: (state, action) => {
      const { isMouseTrail } = action.payload;
      let newState = { ...state };
      if (typeof isMouseTrail === "boolean") {
        newState.isMouseTrail = isMouseTrail;
      }
      return newState;
    },
  },
});

export const { updatePersistInfos } = persistSlice.actions;
export default persistSlice.reducer;
