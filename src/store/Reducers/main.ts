import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { user: {}, signedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload ;
    },
    updateSignin: (state, action) => {
      state.signedIn = action.payload
    },
  },
});

export const { updateUser,updateSignin } = userSlice.actions;
export default userSlice.reducer;
