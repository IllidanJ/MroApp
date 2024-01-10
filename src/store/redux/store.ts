import {configureStore} from '@reduxjs/toolkit';

import favouriteReducer from './favorites';

export const store = configureStore({
  reducer: {
    favoriteMeals: favouriteReducer,
  },
});
