export const actionTypes = {
    GET_CLEARLOCATION: 'GET_CLEARLOCATION',
    GET_CLEARLOCATION_SUCCESS: 'GET_CLEARLOCATION_SUCCESS',
};

export function getClearLocation(payload) {
    return { type: actionTypes.GET_CLEARLOCATION, payload };
}

export function getClearLocationSuccess(payload) {
    return {
        type: actionTypes.GET_CLEARLOCATION_SUCCESS,
        payload,
    };
}