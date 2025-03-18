export const actionTypes = {
    GET_NUMBERPRDSELECT: 'GET_NUMBERPRDSELECT',
    GET_NUMBERPRDSELECT_SUCCESS: 'GET_NUMBERPRDSELECT_SUCCESS',
};

export function getNumberPrdSelect(payload) {
    return { type: actionTypes.GET_NUMBERPRDSELECT, payload };
}

export function getNumberPrdSelectSuccess(payload) {
    return {
        type: actionTypes.GET_NUMBERPRDSELECT_SUCCESS,
        payload,
    };
}