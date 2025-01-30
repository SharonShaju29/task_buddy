import { configureStore } from '@reduxjs/toolkit';
import main from './Reducers/main';

const store = configureStore({
  reducer: {
    main: main,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;