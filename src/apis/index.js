import axios from 'axios';
import { API_ROOT } from '../utils/constants';

/** Boards */
// Move to redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
//   return request.data;
// };

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  return request.data;
};
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData);
  return request.data;
};

/** Boards */

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return request.data;
};
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
  return request.data;
};
export const deletecolumnDetailsAPI = async (columnId) => {
  const request = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return request.data;
};
/** Columns */

/** Card */
export const createNewCardAPI = async (newCardData) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return request.data;
};
/** Card */
