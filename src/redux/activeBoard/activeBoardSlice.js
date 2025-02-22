import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import authorizeAxiosIntance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';
import { isEmpty } from 'lodash';
import { mapOrder } from '../../utils/sorts';
import { generatePlaceholderCard } from '../../utils/formatters';

// khởi tạo giá trị state của slice trong reduxredux
const initialState = {
  currentActiveBoard: null
};

// các hành động (bất đồng bộ ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const request = await authorizeAxiosIntance.get(`${API_ROOT}/v1/boards/${boardId}`);
    return request.data;
  }
);
// Khởi tạo một cái slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload; // là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây ta gắn ra một biến có nghĩa hơn

      // Xử lý dữ liệu nếu cần thiết...
      // ....

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board;
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload; // là response.data trả về ở trên
      // Xử lý dữ liệu nếu cần thiết...
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id');
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board;
    });
  }
});

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bới bì những actions này đơn giản là được redux tọa tự động theo tên reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store và sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

// các file này tên là activeBoardSlice nhưng chúng ta sẽ export một thứ tên là reducer,
// export default activeBoardSlice.reducer;

export const activeBoardReducer = activeBoardSlice.reducer; // là một phần của sliceslice
