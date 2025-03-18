export const actionTypes = {
    GET_RETURN: 'GET_RETURN',
    GET_RETURN_SUCCESS: 'GET_RETURN_SUCCESS',
};

export function getReturn(payload) {
    return { type: actionTypes.GET_RETURN, payload };
}

export function getReturnSuccess(payload) {
    return {
        type: actionTypes.GET_RETURN_SUCCESS,
        payload,
    };
}