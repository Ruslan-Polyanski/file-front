export type TUser = {
    email: string;
    password: string;
};

export type TUserResponse = {
    id: number;
    email: string;
    accessToken?: string;
    refreshToken?: string;
};

export type TUserRefreshToken = {
    id: number;
    email: string;
};
