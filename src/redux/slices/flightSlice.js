import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const initialState = {
  flights: [],
  isLoading: true,
  isError: false,

  route: [],
};
const flightSlice = createSlice({
  name: "flights",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFlights.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isError = false;
      state.flights = actions.payload;
    });
    builder.addCase(getFlights.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },

  reducers: {
    setRoute: (state, action) => {
      const routeLine = action.payload.map((i) => [i.lat, i.lng]);
      state.route = routeLine;
    },
  },
});

export const { setRoute } = flightSlice.actions;
export default flightSlice.reducer;
