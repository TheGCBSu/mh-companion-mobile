const initialArmorState = {
  armorById: {},
  armorIds: [],
};

const armorSlice = createSlice({
  name: "armor",
  initialState,
  reducers: {
    setCompiledArmor(state, action) {
      state.armorById = action.payload.byId;
      state.armorIds = action.payload.ids;
    },
  },
});
