export enum StatusUserForm {
    CREATE,
    MODIFY,
    DELETE,
    NONE,
}
let __status: StatusUserForm;
export function setStatus(s: StatusUserForm) {
    __status = s;
    return __status;
}