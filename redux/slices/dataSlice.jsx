import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: {}, actualData: {} };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataInfos: (state, action) => {
      const { data } = action.payload;
      let newState = { ...state };
      newState.data = data;
      return newState;
    },

    updateDataInfos: (state, action) => {
      const { data } = action.payload;
      let newState = { ...state };
      newState.data = data;
      return newState;
    },
    deleteDataInfos: (state, action) => {
      const { equipement } = action.payload;
      const newState = { ...state };

      const equipementIndex = newState.equipements.findIndex(
        (item) => item.id === equipement.id
      );
      if (equipementIndex === -1) {
        return state;
      }

      const filteredEquipements = newState.equipements.filter(
        (item) => item.id !== equipement.id
      );
      newState.equipements = filteredEquipements;

      return newState;
    },
    setActualData: (state, action) => {
      const { actualData } = action.payload;
      let newState = { ...state };
      newState.actualData = actualData;
      return newState;
    },

    removeDataInfos: () => {
      return initialState;
    },
  },
});

export const {
  fetchDataInfos,
  updateDataInfos,
  deleteDataInfos,
  setActualData,
  removeDataInfos,
} = dataSlice.actions;
export default dataSlice.reducer;
