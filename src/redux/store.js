// state management tool
import { configureStore } from '@reduxjs/toolkit';
import { activeBoardReducer } from './activeBoard/activeBoardSlice';
import { userReducer } from './User/userSlice';
import { activeCardReducer } from './activeCard/activeCardSlice';
import { notificationsReducer } from './notifications/notificationsSlice';
// Cau hinh redux persist
import { combineReducers } from 'redux'; // luu y chung ta co san redux trong node_moduleboi vi khi cai redux toolkit se kem theo redux
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default la locale-storage
// cau hinh persist
const rootPersistConfig = {
  key: 'root', // key của cái persist do chúng ta chỉ định, cứ để mặc định là root
  storage: storage, // biến storage ở trên - lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt
  // backList: ['user'] // định nghĩa các slice KO ĐC PHÉP duy trì mỗi lần f5 trình duyệt
};
// combine các reducers trong dự án
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer
});
// thuc hien persist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // sữa warning khi sử dụng 2 thư viện redux toolkit và redux persit
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
