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
export const fetchBoardsAPI = async (searchPath) => {
  const request = await authorizeAxiosIntance.get(`${API_ROOT}/v1/boards${searchPath}`);
  return request.data;
};
export const createNewBoardAPI = async (data) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/boards`, data);
  toast.success('Create new successfully !');
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
export const updateCardDetailsAPI = async (cardId, newCardData) => {
  const request = await authorizeAxiosIntance.put(`${API_ROOT}/v1/cards/${cardId}`, newCardData);
  return request.data;
};
/** Card */

/** Users */
export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosIntance.post(`${API_ROOT}/v1/users/register`, data);
  toast.success(
    'Account created successfully! Please check your email and veridy your account before logging in!'
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
export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosIntance.get(`${API_ROOT}/v1/users/refresh_token`);
  return response.data;
};
/** Users */

/** invite user */
export const invitedUserToBoardAPI = async (data) => {
  const response = await authorizeAxiosIntance.post(`${API_ROOT}/v1/invitations/board`, data);
  toast.success('User invited to board successfully');
  return response.data;
};
/** invite user */
