import { createSlice } from "@reduxjs/toolkit";

const initialState = { equipements: [], actualEquipement: {} };

const equipementsSlice = createSlice({
  name: "equipements",
  initialState,
  reducers: {
    fetchEquipementsInfos: (state, action) => {
      const { equipements } = action.payload;
      let newState = { ...state };
      newState.equipements = equipements;
      return newState;
    },
    updateEquipementsInfos: (state, action) => {
      const { equipement } = action.payload;

      const equipementIndex = state.equipements.findIndex(
        (item) => item.id === equipement.id
      );

      if (equipementIndex === -1) {
        return {
          ...state,
          equipements: [...state.equipements, equipement],
        };
      }

      return {
        ...state,
        equipements: [
          ...state.equipements.slice(0, equipementIndex),
          equipement,
          ...state.equipements.slice(equipementIndex + 1),
        ],
      };
    },
    deleteEquipementInfos: (state, action) => {
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
    setActualEquipement: (state, action) => {
      const { equipement } = action.payload;
      let newState = { ...state };
      newState.actualEquipement = equipement;
      return newState;
    },

    removeEquipementsInfos: () => {
      return initialState;
    },
  },
});

export const {
  fetchEquipementsInfos,
  updateEquipementsInfos,
  setActualEquipement,
  deleteEquipementInfos,
  removeEquipementsInfos,
} = equipementsSlice.actions;
export default equipementsSlice.reducer;
