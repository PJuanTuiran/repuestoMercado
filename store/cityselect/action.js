export const actionTypes = {
    GET_CITYSELECT: 'GET_CITYSELECT',
    GET_CITYSELECT_SUCCESS: 'GET_CITYSELECT_SUCCESS',
};

export function getCitySelect(payload) {
    return { type: actionTypes.GET_CITYSELECT, payload };
}

export function getCitySelectSuccess(payload) {
    return {
        type: actionTypes.GET_CITYSELECT_SUCCESS,
        payload,
    };
}