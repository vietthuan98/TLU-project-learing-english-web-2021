export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const PHONE_REGEX = /^\d{10,11}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;

export enum BUS_EVENTS {
    OPEN_ARTICLE_CREATION_POPUP = 'OPEN_ARTICLE_CREATION_POPUP',
}