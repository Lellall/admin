import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiSlice from "./api/api.slice";
import { AuthSlice } from "./auth/auth.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

const ignoredActions = [PERSIST];

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: [AuthSlice.name],
};
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [AuthSlice.reducerPath]: AuthSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const setupStore = (preloadedState: any, reducer: any) => {
    return configureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: { ignoredActions },
            }).concat(apiSlice.middleware),
    });
};
export const store = setupStore({}, persistedReducer);

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
