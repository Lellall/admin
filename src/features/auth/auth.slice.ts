/* eslint-disable no-param-reassign */
// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    // Ensure AuthState is exported
    isAuthenticated: boolean
    accessToken: string | null
    refreshToken: string | null
    user: any
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("access_token"),
    accessToken: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            const { isAuthenticated, accessToken, refreshToken, user } =
                action.payload
            state.isAuthenticated = isAuthenticated
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            if (accessToken) {
                localStorage.setItem("access_token", accessToken)
            } else {
                localStorage.removeItem("access_token")
            }

            if (refreshToken) {
                localStorage.setItem("refresh_token", refreshToken)
            } else {
                localStorage.removeItem("refresh_token")
            }
            if (user) {
                localStorage.setItem("user", JSON.stringify(user))
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
        },
    },
})

export const { setAuthState, logout } = authSlice.actions
export default authSlice.reducer
