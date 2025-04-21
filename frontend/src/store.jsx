// store.js
import { configureStore } from '@reduxjs/toolkit';
import { filteredUser, userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    filterUsers:filteredUser
  },
  devTools: true,
});

export default store;
