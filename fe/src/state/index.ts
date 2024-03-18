import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {
    sort: 0,
    features: null,
    energyClass: null,
    capacity: null,
    page: 1,
    fetching: false,
    items: []
  },
  order: [],
};

// reducers to get redux state data
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearch: (state, action) => {
        const { page } = action.payload;
        state.search.page = page;
    },
    setSearchFetching: (state) => {
      state.search.fetching = !state.search.fetching
    },
    setItems: (state, action) => {
        state.search.items = action.payload;
    },
    addItems: (state, action) => {
        state.search.items = state.search.items.concat(action.payload)
    }
  },
});

export const { setSearch, setSearchFetching, setItems, addItems } = globalSlice.actions;

export default globalSlice.reducer;