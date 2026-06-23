export interface JwtPayload {
    sub: string;
    email: string;
    role: "rider";
}

export interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
}