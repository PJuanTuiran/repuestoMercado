export const actionTypes = {
    GET_DATASEARCHINTERACTIVE: 'GET_DATASEARCHINTERACTIVE',
    GET_DATASEARCHINTERACTIVE_SUCCESS: 'GET_DATASEARCHINTERACTIVE_SUCCESS',
};

export function getDataSearchInteractive(payload) {
    return { type: actionTypes.GET_DATASEARCHINTERACTIVE, payload };
}

export function getDataSearchInteractiveSuccess(payload) {
    return {
        type: actionTypes.GET_DATASEARCHINTERACTIVE_SUCCESS,
        payload,
    };
}