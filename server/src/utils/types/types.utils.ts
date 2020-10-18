export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type EmitterRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ErrorResponse = {
    status: number;

    errorCode: string;

    message: string;

    data?: object;
};

export type EmitterResponse = {
    requestMethod: EmitterRequestMethod;

    data?: {
        id: string,
    };
};

export type DependentContext = {
    requestMethod: EmitterRequestMethod;

    context: string;

    id: string;
};