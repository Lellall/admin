// interface RefreshResponse {}
export interface RefreshRequest {
    refreshToken: string
    role: string
}

export interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    role: string
    isEmailVerified: boolean
    registrationSource: string
    streetName: string
    houseNumber: string
    apartmentName: string
    estate: string
    poBox: string
    address: {
        streetName: string
        houseNumber: string
        apartmentName: string
        estate: string
        poBox: string
        region: string
    }
}

export interface LoginResponse {
    refresh_token: string
    access_token: string
    token_type: string
    isAuthenticated: boolean
    user: User
}

export interface LoginRequest {
    email: string
    password: string
    role: string
}
