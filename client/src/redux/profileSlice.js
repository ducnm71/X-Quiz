import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem('idUser', action.payload._id);
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
