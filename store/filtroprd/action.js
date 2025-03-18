export const actionTypes = {
    GET_FILTROPRD: 'GET_FILTROPRD',
    GET_FILTROPRD_SUCCESS: 'GET_FILTROPRD_SUCCESS',
};

export function getFiltroPrd(payload) {
    return { type: actionTypes.GET_FILTROPRD, payload };
}

export function getFiltroPrdSuccess(payload) {
    return {
        type: actionTypes.GET_FILTROPRD_SUCCESS,
        payload,
    };
}