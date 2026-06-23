export interface JwtPayload {
    sub: string;
    email: string;
    role: "rider";
}

export type AppEnv = {
    Variables: {
        user: JwtPayload;
    };
};