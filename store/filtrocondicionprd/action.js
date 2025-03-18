export const actionTypes = {
    GET_FILTROCONDICIONPRD: 'GET_FILTROCONDICIONPRD',
    GET_FILTROCONDICIONPRD_SUCCESS: 'GET_FILTROCONDICIONPRD_SUCCESS',
};

export function getFiltroCondicionPrd(payload) {
    return { type: actionTypes.GET_FILTROCONDICIONPRD, payload };
}

export function getFiltroCondicionPrdSuccess(payload) {
    return {
        type: actionTypes.GET_FILTROCONDICIONPRD_SUCCESS,
        payload,
    };
}