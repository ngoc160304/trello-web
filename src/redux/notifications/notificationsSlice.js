import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import authorizeAxiosIntance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';
// khởi tạo giá trị state của slice trong reduxredux
const initialState = {
  currentNotifications: null
};
export const fetchInvitationAPI = createAsyncThunk('notifications/fetchInvitationAPI', async () => {
  const response = await authorizeAxiosIntance.get(`${API_ROOT}/v1/invitations`);
  return response.data;
});
export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, notificationId }) => {
    const response = await authorizeAxiosIntance.put(
      `${API_ROOT}/v1/invitations/board/${notificationId}`,
      { status }
    );
    return response.data;
  }
);
// Khởi tạo một cái slice trong kho lưu trữ redux store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload;
      state.currentNotifications.unshift(incomingInvitation);
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload;
      state.currentNotifications = Array.isArray(incomingInvitation)
        ? incomingInvitation.reverse()
        : [];
    });
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;
      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      );
      getInvitation.boardInvitation = incomingInvitation.boardInvitation;
    });
  }
});

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bới bì những actions này đơn giản là được redux tọa tự động theo tên reducer
export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } =
  notificationsSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store và sử dụng
export const selectCurrentInvitations = (state) => {
  return state.notifications.currentNotifications;
};
// các file này tên là notificationsSlice nhưng chúng ta sẽ export một thứ tên là reducer,
// export default notificationsSlice.reducer;
export const notificationsReducer = notificationsSlice.reducer;
