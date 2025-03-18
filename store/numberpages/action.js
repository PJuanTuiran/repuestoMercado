export const actionTypes = {
    GET_NUMBERPAGES: 'GET_NUMBERPAGES',
    GET_NUMBERPAGES_SUCCESS: 'GET_NUMBERPAGES_SUCCESS',
};

export function getNumberPages(payload) {
    return { type: actionTypes.GET_NUMBERPAGES, payload };
}

export function getNumberPagesSuccess(payload) {
    return {
        type: actionTypes.GET_NUMBERPAGES_SUCCESS,
        payload,
    };
}