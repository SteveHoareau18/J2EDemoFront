import type { User } from "./User";
export enum FormResponse {
    SUCCESS,
    ERROR,
    RETURN,
    NONE
}
export type Form = {
    sendMethod: string;
    actionLink: string;
    response: FormResponse;
    user?: User;
}