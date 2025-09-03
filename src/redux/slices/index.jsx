import {createSlice} from '@reduxjs/toolkit';
import { Apis } from '../services';

const initialState = {
  token: null,
  user: {},
  // profileCreated: false,
};

export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(Apis.endpoints.verifyOTP.matchFulfilled, (state, action) => {
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.token = action.payload.token;
        }
      })
      .addMatcher(Apis.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.token = action.payload.token;
        }
      })
    // .addMatcher(Apis.endpoints.updateUser.matchFulfilled, (state, action) => {
    //   if (action.payload?.data) {
    //     state.user = {
    //       ...state.user,
    //       ...action.payload.data,
    //     };
    //   }
    // })
    //   .addMatcher(Apis.endpoints.updateTechnician.matchFulfilled, (state, action) => {
    //   if (action.payload?.data) {
    //     state.user = {
    //       ...state.user,
    //       ...action.payload.data,
    //     };
    //   }
    // });
  },
});

export const {logout} = Slice.actions;

export default Slice.reducer;
