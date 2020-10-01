export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type ErrorResponse = {
    status: number;

    errorCode: string;

    message: string;

    data?: object;
}