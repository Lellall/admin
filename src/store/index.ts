import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/auth.slice";
import { api } from "../services/baseApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = {
    auth: AuthState;
    [api.reducerPath]: ReturnType<typeof api.reducer>;
};

export type AppDispatch = typeof store.dispatch;

export default store;
