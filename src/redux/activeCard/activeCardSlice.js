import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// khởi tạo giá trị state của slice trong reduxredux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
};

// Khởi tạo một cái slice trong kho lưu trữ redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      const board = action.payload; // là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây ta gắn ra một biến có nghĩa hơn
      state.currentActiveCard = board;
    },
    // Xóa và ẩn active card
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
      state.isShowModalActiveCard = false;
    },
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true;
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {}
});

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bới bì những actions này đơn giản là được redux tọa tự động theo tên reducer
export const { updateCurrentActiveCard, clearCurrentActiveCard, showModalActiveCard } =
  activeCardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store và sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};
export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard;
};

// các file này tên là activeCardSlice nhưng chúng ta sẽ export một thứ tên là reducer,
// export default activeCardSlice.reducer;

export const activeCardReducer = activeCardSlice.reducer; // là một phần của sliceslice
