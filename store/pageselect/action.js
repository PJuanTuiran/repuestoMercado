export const actionTypes = {
    GET_PAGESELECT: 'GET_PAGESELECT',
    GET_PAGESELECT_SUCCESS: 'GET_PAGESELECT_SUCCESS',
};

export function getPageSelect(payload) {
    return { type: actionTypes.GET_PAGESELECT, payload };
}

export function getPageSelectSuccess(payload) {
    return {
        type: actionTypes.GET_PAGESELECT_SUCCESS,
        payload,
    };
}