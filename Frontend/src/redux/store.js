import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactslice';
import authReducer from './authslice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});
