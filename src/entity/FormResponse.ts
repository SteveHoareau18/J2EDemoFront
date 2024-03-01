export enum Response {
    SUCCESS,
    ERROR,
    RETURN,
    NONE
}
export type FormResponse = {
    response: Response | null;
}