import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { Apis } from '../services';
import { Slice } from '../slices';


const persistConfig = {
  key: 'persistedData', 
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, Slice.reducer);

export const store = configureStore({
  reducer: {
    persistedData: persistedAuthReducer,      
    [Apis.reducerPath]: Apis.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(Apis.middleware)
});

export const persistor = persistStore(store);
