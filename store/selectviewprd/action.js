export const actionTypes = {
    GET_SELECTVIEWPRD: 'GET_SELECTVIEWPRD',
    GET_SELECTVIEWPRD_SUCCESS: 'GET_SELECTVIEWPRD_SUCCESS',
};

export function getSelectViewPrd(payload) {
    return { type: actionTypes.GET_SELECTVIEWPRD, payload };
}

export function getSelectViewPrdSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTVIEWPRD_SUCCESS,
        payload,
    };
}