export const actionTypes = {
    GET_ADDLOGIN: 'GET_ADDLOGIN',
    GET_ADDLOGIN_SUCCESS: 'GET_ADDLOGIN_SUCCESS',
};

export function getAddLogin(payload) {
    return { type: actionTypes.GET_ADDLOGIN, payload };
}

export function getAddLoginSuccess(payload) {
    return {
        type: actionTypes.GET_ADDLOGIN_SUCCESS,
        payload,
    };
}