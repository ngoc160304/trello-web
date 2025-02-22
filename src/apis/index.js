// import axios from 'axios';
import { toast } from 'react-toastify';
import authorizeAxiosIntance from '../utils/authorizeAxios';
import { API_ROOT } from '../utils/constants';

/** Boards */
// Move to redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
//   return request.data;
// };

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await authorizeAxiosIntance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  return request.data;
};
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const request = await authorizeAxiosIntance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  );
  return request.data;
};

/** Boards */

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/columns`, newColumnData);
  return request.data;
};
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const request = await authorizeAxiosIntance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
  return request.data;
};
export const deletecolumnDetailsAPI = async (columnId) => {
  const request = await authorizeAxiosIntance.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return request.data;
};
/** Columns */

/** Card */
export const createNewCardAPI = async (newCardData) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/cards`, newCardData);
  return request.data;
};
/** Card */

/** Users */
export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosIntance.post(`${API_ROOT}/v1/users/resister`, data);
  toast.success(
    'Account created successfully! Please check and veridy your account before logging in!'
  );
  return response.data;
};
export const verifiUserAPI = async (data) => {
  const response = await authorizeAxiosIntance.put(`${API_ROOT}/v1/users/verify`, data);
  toast.success(
    'Account verified successfully! Now you can login to enjoy our services! Have a good day!',
    {
      theme: 'colored'
    }
  );
  return response.data;
};
/** Users */
