export const actionTypes = {
    GET_DUPLICARPRD: 'GET_DUPLICARPRD',
    GET_DUPLICARPRD_SUCCESS: 'GET_DUPLICARPRD_SUCCESS',
};

export function getDuplicarPrd(payload) {
    return { type: actionTypes.GET_DUPLICARPRD, payload };
}

export function getDuplicarPrdSuccess(payload) {
    return {
        type: actionTypes.GET_DUPLICARPRD_SUCCESS,
        payload,
    };
}