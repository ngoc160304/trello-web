import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import authorizeAxiosIntance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';
import { toast } from 'react-toastify';

const initialState = {
  currentUser: null
};

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/users/login`, data);
  return request.data;
});
export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async (showSuccessMessage) => {
  const request = await authorizeAxiosIntance.delete(`${API_ROOT}/v1/users/logout`);
  if (showSuccessMessage) {
    toast.success('Logged out successfully!');
  }
  return request.data;
});
export const updateUserAPI = createAsyncThunk('user/updateUserAPI', async (data) => {
  const request = await authorizeAxiosIntance.put(`${API_ROOT}/v1/users/update`, data);
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
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null;
    });
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  }
});

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
