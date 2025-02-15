import axios from 'axios';
import { API_ROOT } from '../utils/constants';

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return request.data;
};
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  return request.data;
};

/** Boards */

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return request.data;
};

/** Columns */

/** Card */
export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return request.data;
};
/** Card */
