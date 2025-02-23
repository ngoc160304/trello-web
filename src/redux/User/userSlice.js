import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import authorizeAxiosIntance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';

const initialState = {
  currentUser: null
};

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/users/login`, data);
  return request.data;
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    });
  }
});

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
