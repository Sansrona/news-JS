export enum ErrorCodes {
    Unauthorized = 401,
    NotFound = 404,
}

export interface Options {
    [key: string]: string | number;
}
