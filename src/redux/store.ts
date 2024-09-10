import { configureStore } from "@reduxjs/toolkit"
import authReducer, { AuthState } from "../features/auth/auth.slice"
import { baseApi as api } from "./api/baseApi"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = {
  auth: AuthState
  [api.reducerPath]: ReturnType<typeof api.reducer>
}

export type AppDispatch = typeof store.dispatch
