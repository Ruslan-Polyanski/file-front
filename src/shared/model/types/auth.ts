export type TUser = {
    email: string;
    password: string;
};

export type TUserResponse = {
    id: number;
    email: string;
    token?: string;
};
