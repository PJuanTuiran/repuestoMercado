export const actionTypes = {
    GET_GRIPSELECT: 'GET_GRIPSELECT',
    GET_GRIPSELECT_SUCCESS: 'GET_GRIPSELECT_SUCCESS',
};

export function getGripSelect(payload) {
    return { type: actionTypes.GET_GRIPSELECT, payload };
}

export function getGripSelectSuccess(payload) {
    return {
        type: actionTypes.GET_GRIPSELECT_SUCCESS,
        payload,
    };
}