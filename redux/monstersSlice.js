import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monstersById: {},
  monsterIds: [],
};

const monstersSlice = createSlice({
  name: "monsters",
  initialState,
  reducers: {
    setCompiledMonsters(state, action) {
      state.monstersById = action.payload.byId;
      state.monsterIds = action.payload.ids;
    },
  },
});

export const { setCompiledMonsters } = monstersSlice.actions;
export default monstersSlice.reducer;
