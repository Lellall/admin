import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { authSlice, AuthState } from "../features/auth/auth.slice"
import { baseApi as api } from "./api/baseApi"
import { shopSlice } from "./shops/shops-slice"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "shop"], // only auth and shop will be persisted
}
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [shopSlice.name]: shopSlice.reducer,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

export const persistor = persistStore(store)

export type RootState = {
  auth: AuthState
  [api.reducerPath]: ReturnType<typeof api.reducer>
}

export type AppDispatch = typeof store.dispatch
